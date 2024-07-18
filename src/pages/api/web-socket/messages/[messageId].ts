import { getUserDataPages } from "@/actions/get-user-data";
import { supabaseServerPages } from "@/lib/supabase/supabaseServerPages";
import { SocketIoRes } from "@/types/app";
import { type SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest } from "next";

async function handler(req: NextApiRequest, res: SocketIoRes) {
  if (!["PATCH", "DELETE"].includes(req.method!)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userData = await getUserDataPages(req, res);
    if (!userData) return res.status(401).json({ error: "Unauthorized" });

    const { channelId, messageId, workplaceId } = req.query;

    if (!channelId || !messageId || !workplaceId) {
      return res.status(400).json({ error: "Bad request" });
    }
    const { content } = req.body;

    const supabase = supabaseServerPages(req, res);

    const { data: MessageData, error: MessageError } = await supabase
      .from("messages")
      .select("*,user:userId(*)")
      .eq("id", messageId)
      .single();
    if (MessageError || !MessageData) {
      console.log("yahi dikt hai");
      console.log(MessageError);
      return res.status(404).json({ messages: "Bad request" });
    }
    const isMessageOwner = MessageData.user.id === userData.id;
    const isAdmin = userData.type === "admin";
    const isRegulator = userData.type === "regulator";

    const canEditMessage = isMessageOwner || !MessageData.is_deleted;
    if (!canEditMessage) {
      return res.status(403).json({ error: "Forbidden" });
    }
    if (req.method === "PATCH") {
      console.log(isMessageOwner);
      if (!isMessageOwner) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await updateMessageContent(supabase, messageId as string, content);
    } else if (req.method === "DELETE") {
      await deleteMessage(supabase, messageId as string);
    }
    const { data, error } = await supabase
      .from("messages")
      .select("*,user: userId(*)")
      .order("created_at", { ascending: true })
      .eq("id", messageId)
      .single();

    if (error || !data) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.socket.server.io?.emit(
      `channel:${channelId}:channel-messages:update`,
      data
    );
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
    .from("messages")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", messageId)
    .select("*,user: userId(*)")
    .single();
}

async function deleteMessage(supabase: SupabaseClient, messageId: string) {
  const { data, error } = await supabase
    .from("messages")
    .update({
      id_deleted: true,
      content: "This message has been deleted",
      file_url: null,
    })
    .eq("id", messageId)
    .select("*,user: userId(*)")
    .single();
  if (error) {
    console.log(error);
    return;
  }
}

export default handler;
