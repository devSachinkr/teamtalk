"use server";

import { superbaseCreateClient } from "@/lib/supabase/create-server";

export const getCurrentWorkplace = async (workplaceId: string) => {
  const supabase = await superbaseCreateClient();

  const res = await supabase
    .from("workplaces")
    .select("*")
    .eq("id", workplaceId)
    .single();
  return res;
};
