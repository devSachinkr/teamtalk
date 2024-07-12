"use server";

import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { Workplaces } from "@/types/app";
import { getUserData } from "./get-user-data";
import { redirect } from "next/navigation";
import { updateUserWorkplace } from "./update-user-workspace";
import { addMemberToWorkplace } from "./add-member-to-workplace";

export const createWorkSpace = async ({
  image,
  invite_code,
  name,
  slug,
}: {
  name: string;
  slug: string;
  image: string;
  invite_code: string;
}) => {
  const suparbase = await superbaseCreateClient();
  const user = await getUserData();
  if (!user) {
    redirect("/sign-in");
  }
  try {
    const { data, error } = await suparbase
      .from("workplaces")
      .insert({
        image,
        invite_code,
        name,
        slug,
        super_admin: user.data?.id,
      })
      .select("*");
    if (error) {
      return {
        status: 500,
        error: error,
      };
    }
    const res = await updateUserWorkplace(user.data?.id!, data[0].id);
    if (res?.error) {
      return {
        status: 500,
        message: res.error,
      };
    }

    const { data: memberData, error: memberError } = await addMemberToWorkplace(
      user.data?.id!,
      data[0].id
    );
  } catch (error) {}
};
