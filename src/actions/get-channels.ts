"use server";

import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { getUserData } from "./get-user-data";

export const getChannels = async (workplaceId: string) => {
  const user = await getUserData();
  try {
    const supabase = await superbaseCreateClient();
    const { data, error } = await supabase
      .from("workplaces")
      .select("channels")
      .eq("id", workplaceId)
      .single();
    if (error) {
      console.log(error);
      return [];
    }

    const channelId = data?.channels;
    if (!channelId || channelId.length === 0) {
      return [];
    }
    const { data: ChannelData, error: ChannelError } = await supabase
      .from("channels")
      .select("*")
      .in("id", channelId);

    const useWorkplaceChannels = ChannelData?.filter((channel) =>
      channel.members?.includes(user?.data?.id)
    );
       return useWorkplaceChannels;
  } catch (error) {
    console.log(error);
  }
};
