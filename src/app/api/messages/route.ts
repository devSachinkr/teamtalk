import { getUserData } from "@/actions/get-user-data";
import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

function pagination(page: number, size: number) {
  const limit = size ? +size : 10;
  const from = page ? page * limit : 0;
  const to = page ? from + limit - 1 : limit - 1;
  return { from, to };
}

export async function GET(req: NextApiRequest) {
  const supabase = await superbaseCreateClient();
  const userData = await getUserData();
  const { searchParams } = new URL(req.url!);
  const channelId = searchParams.get("channelId");
  if (!userData) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!channelId) {
    return new Response("Bad Request", { status: 400 });
  }
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));
  const { from, to } = pagination(page, size);

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*, user:userId(*)")
      .eq("channel_id", channelId)
      .range(from, to)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
      return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
