"use server";
import {
  type PostgrestSingleResponse,
  PostgrestResponseFailure,
} from "@supabase/postgrest-js";
import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { getUserData } from "./get-user-data";
import { Workplaces } from "@/types/app";
import { addMemberToWorkplace } from "./add-member-to-workplace";
import { updateUserWorkplace } from "./update-user-workspace";

export const workplaceInvite = async (inviteCode: string) => {
  if (!inviteCode) {
    throw new Error("Invalid invite code");
  }
  const user = await getUserData();
  if (!user) {
    throw new Error("User not found");
  }
  const supabase = await superbaseCreateClient();
  // @ts-ignore
  const { data, error }: { data: Workplaces; error: any } = await supabase
    .from("workplaces")
    .select("*")
    .eq("invite_code", inviteCode)
    .single();

  if (error) {
    console.log("Error in workplaceInvite ", error);
    return;
  }
  // @ts-ignore
  const isMember = data?.members?.includes(user.data?.id!);

  if (isMember) {
    return;
  }

  if (data?.super_admin === user.data?.id) {
    console.log("Super admin cannot be invited");
    return;
  }
  await addMemberToWorkplace(user.data?.id!, data?.id!);
 await updateUserWorkplace(user.data?.id!, data?.id!);
};
