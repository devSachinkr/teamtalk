"use server";

import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { USER, Workplaces } from "@/types/app";

export const getCurrentWorkplace = async (workplaceId: string) => {
  const supabase = await superbaseCreateClient();

  const res = await supabase
    .from("workplaces")
    .select("*,channels (*)")
    .eq("id", workplaceId)
    .single();
  if (res.error) {
    return null;
  }
  const { members } = res.data as Workplaces;
  const membersDetails = await Promise.all(
    members?.map(async (member) => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", member)
        .single();
      if (error) {
        console.log(error);
        return null;
      }

      return data;
    })!
  );
  res.data.members = membersDetails.filter((member:USER) => member !== null);
  return res;
};
