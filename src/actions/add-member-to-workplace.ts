import { superbaseCreateClient } from "@/lib/supabase/create-server";

export const addMemberToWorkplace = async (
  user_id: string,
  workplace_id: string
) => {
  const supabase = await superbaseCreateClient();
  const { data, error } = await supabase.rpc("add_members_to_workplace", {
    user_id,
    workplace_id,
  });
  return {
    data,
    error,
  };
};
