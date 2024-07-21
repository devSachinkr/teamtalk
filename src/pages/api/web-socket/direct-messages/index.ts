import { getUserData, getUserDataPages } from "@/actions/get-user-data";
import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { supabaseServerPages } from "@/lib/supabase/supabaseServerPages";
import { SocketIoRes } from "@/types/app";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: SocketIoRes) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userData = await getUserDataPages(req, res);
    if (!userData) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { recipientId } = req.query;
    const { content, file_url } = req.body;

    const supabase = supabaseServerPages(req, res);

    const { data, error } = await supabase
      .from("direct_messages")
      .insert({
        content,
        user_one: userData.id,
        user_two: recipientId,
        file_url,
        userId: userData.id,
      })
      .select("*, user:userId(*), user_one(*), user_two(*)")
      .order("created_at", { ascending: true });

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error sending message" });
    }
    res?.socket?.server?.io?.emit("direct-message:post", data);
    return res.status(201).json({ message: "Message sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error sending message" });
  }
}
