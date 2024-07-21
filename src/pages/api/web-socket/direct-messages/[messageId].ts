import { getUserDataPages } from "@/actions/get-user-data";
import { supabaseServerPages } from "@/lib/supabase/supabaseServerPages";
import { SocketIoRes } from "@/types/app";
import { type SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest } from "next";
export default async function handler(req: NextApiRequest, res: SocketIoRes) {
  if (!["PATCH", "DELETE"].includes(req.method!)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await getUserDataPages(req, res);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const { messageId } = req.query;
    const { content } = req.body;

    if (!messageId) {
      return res.status(400).json({ error: "Bad request" });
    }
    const supabase = supabaseServerPages(req, res);
    const { data: MessageData, error: MessageError } = await supabase
      .from("direct_messages")
      .select(
        `*,
         user_one:users!direct_messages_user_one_fkey(*),
         user_two:users!direct_messages_user_two_fkey(*)
        `
      )
      .eq("id", messageId)
      .single();

    if (MessageError || !MessageData) {
      console.log(MessageError);
      return res.status(404).json({ messages: "Bad request" });
    }

    const isMessageOwner =
      // @ts-ignore
      user.id === MessageData?.user_one?.id! ||
      // @ts-ignore
      user.id === MessageData?.user_two?.id!;
    const isAdmin = user.type === "admin";
    const isRegulator = user.type === "regulator";
    // @ts-ignore
    const canEditMessage = isMessageOwner || !MessageData.is_deleted;

    if (!canEditMessage) {
      return res.status(403).json({ error: "Forbidden" });
    }
    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await updateMessageContent(supabase, messageId as string, content);
    } else if (req.method === "DELETE") {
      await deleteMessage(supabase, messageId as string);
    }

    const { data, error } = await supabase
      .from("direct_messages")
      .select(
        `*,
        user_one:users!direct_messages_user_one_fkey(*),
        user_two:users!direct_messages_user_two_fkey(*),
        user:users!direct_messages_user_fkey(*)
      `
      )
      .eq("id", messageId)
      .single();

    if (error || !data) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.socket.server.io?.emit(`direct-message:update`, data);
    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateMessageContent(
  supabase: SupabaseClient,
  messageId: string,
  content: string
) {
  await supabase
    .from("direct_messages")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", messageId)
    .select(
      `*, user_one:users!direct_messages_user_one_fkey(*),user_two:users!direct_messages_user_two_fkey(*)`
    )
    .single();
}

async function deleteMessage(supabase: SupabaseClient, messageId: string) {
  const { data, error } = await supabase
    .from("direct_messages")
    .update({
      id_deleted: true,
      content: "This message has been deleted",
      file_url: null,
    })
    .eq("id", messageId)
    .select(
      `*, user_one:users!direct_messages_user_one_fkey(*),
      user_two:users!direct_messages_user_two_fkey(*)`
    )
    .single();
  if (error) {
    console.log(error);
    return;
  }
}
