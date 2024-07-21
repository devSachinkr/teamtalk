import { getUserData } from "@/actions/get-user-data";
import { workplaceInvite } from "@/actions/workplace-invite";
import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    inviteCode: string;
  };
};

const page = async ({ params: { inviteCode } }: Props) => {
  const user = await getUserData();
  if (!user?.data) {
    redirect("/sign-in");
  }

  await workplaceInvite(inviteCode);
  const supabase = await superbaseCreateClient();
  const { data, error } = await supabase
    .from("workplaces")
    .select("*")
    .eq("invite_code", inviteCode)
    .single();

  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    redirect(`/workplace/${data.id}`);
  } else {
    redirect("/crete-workplace");
  }
  return <div></div>;
};

export default page;
