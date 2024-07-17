import { getUserDataPages } from "@/actions/get-user-data";
import { supabaseServerPages } from "@/lib/supabase/supabaseServerPages";
import { SocketIoRes } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: SocketIoRes) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  try {
    const userData = await getUserDataPages(req, res);
    if (!userData) return res.status(401).json({ error: "Unauthorized" });
    const { channelId, workplaceId } = req.query;
    if (!channelId || !workplaceId) {
      return res.status(400).json({ error: "Bad request" });
    }
    const { content, fileUrl } = req.body;
    if (!content && !fileUrl) {
      return res.status(400).json({ error: "Bad request" });
    }

    const supabase = supabaseServerPages(req, res);

    const { data, error } = await supabase
      .from("channels")
      .select("*")
      .eq("id", channelId)
      .contains("members", [userData.id]);
    if (!data?.length) {
      return res.status(404).json({ error: "Channel not found" });
    }
    const { data: messageData, error: messageError } = await supabase
      .from("messages")
      .insert({
        content,
        file_url: fileUrl,
        channel_id: channelId,
        userId: userData.id,
        workplace_id: workplaceId,
      })
      .select("*,user:userId(*)")
      .order("created_at", { ascending: true })
      .single();

    if (messageError) {
      console.log("message creation error", messageError);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.socket?.server?.io.emit(`channel:${channelId}:channel-message`, messageData);
    return res.status(200).json({ data: messageData });
  } catch (error) {
    console.log("message creation error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
