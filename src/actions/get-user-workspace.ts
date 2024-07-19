"use server";

import { superbaseCreateClient } from "@/lib/supabase/create-server";

export const getUserWorkplace = async (workplace_id: string[]) => {
  const supabase = await superbaseCreateClient();
  const { data, error } = await supabase
    .from("workplaces")
    .select("*")
    .in("id", workplace_id);
    
  return { data, error };
};
