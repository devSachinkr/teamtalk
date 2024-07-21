import { getUserData } from "@/actions/get-user-data";
import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { NextResponse } from "next/server";

function pagination(page: number, size: number) {
  const limit = size ? size : 10;
  const from = page ? page * limit : 0;
  const to = page ? from + limit - 1 : limit - 1;
  return { from, to };
}

export async function GET(req: Request) {
  try {
    const supabase = await superbaseCreateClient();
    const user = await getUserData();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const { searchParams } = new URL(req.url);
    const userId = user.data?.id;
    const recipientId = searchParams.get("recipientId");
    const page = Number(searchParams.get("page"));
    const size = Number(searchParams.get("size"));
    const { from, to } = pagination(page, size);
    const { data, error } = await supabase   
      .from("direct_messages")
      .select(`*, user:userId(*),user_one:user_one(*), user_two:user_two(*)`)
      .or(
        `and(user_one.eq.${userId}, user_two.eq.${recipientId}), and(user_one.eq.${recipientId}, user_two.eq.${userId})`
      )
      .range(from, to)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
    return NextResponse.json({ data }, { status: 201 });

  } catch (error) {
      console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
