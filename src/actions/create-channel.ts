"use server";

import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { getUserData } from "./get-user-data";
import { Channel } from "@/types/app";

export const createChannel = async (name: string, workplaceId: string) => {
  const user = await getUserData();
  if (!user)
    return {
      status: 401,
      message: "Unauthorized",
      error: "Unauthorized",
    };
  try {
    if (!name || !workplaceId) return;

    const supabase = await superbaseCreateClient();
    // @ts-ignore
    const res: { data: Channel[]; error: any } = await supabase
      .from("channels")
      .insert({
        name,
        workplace_id: workplaceId,
        user_id: user.data?.id,
      })
      .select("*");
    if (res.data) {
      // update channel members
      const { updatedMembersError } = await updateChannelMembers(
        res.data[0]?.id!,
        user.data?.id!
      );
      if (updatedMembersError)
        return {
          status: 500,
          message:
            updatedMembersError.message || "Failed to update channel members",
          data: null,
        };
      // update user channels
      const { updatedUserChannelsError } = await updateUserChannels(
        user.data?.id!,
        res.data[0]?.id!
      );
      if (updatedUserChannelsError) {
        return {
          status: 500,
          message:
            updatedUserChannelsError.message ||
            "Failed to update user channels",
          data: null,
        };
      }
      //   update workplace channels
      const { updatedWorkplaceChannelsError } = await updateWorkplaceChannels(
        workplaceId,
        res.data[0]?.id!
      );
      if (updatedWorkplaceChannelsError) {
        return {
          status: 500,
          message:
            updatedWorkplaceChannelsError.message ||
            "Failed to update workplace channel",
          data: null,
        };
      }
      return {
        status: 200,
        data: res.data,
        message: "channel created successfully",
      };
    } else {
      return {
        status: 500,
        message: res.error?.message,
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error,
      data: null,
    };
  }
};

export const updateChannelMembers = async (
  channelId: string,
  userId: string
) => {
  const supabase = await superbaseCreateClient();
  const { error, data } = await supabase.rpc("update_channel_members", {
    new_member: userId,
    channel_id: channelId,
  });
  if (error) {
    console.log(error);
  }
  return {
    updatedChannelMembers: data,
    updatedMembersError: error,
  };
};

export const updateUserChannels = async (userId: string, channelId: string) => {
  const supabase = await superbaseCreateClient();
  const { error, data } = await supabase.rpc("update_user_channels", {
    channel_id: channelId,
    user_id: userId,
  });
  if (error) {
    console.log(error);
  }
  return {
    updatedUserChannels: data,
    updatedUserChannelsError: error,
  };
};

const updateWorkplaceChannels = async (
  workplaceId: string,
  channelId: string
) => {
  const supabase = await superbaseCreateClient();
  const { data, error } = await supabase.rpc("add_channel_to_workplace", {
    channel_id: channelId,
    workplace_id: workplaceId,
  });
  if (error) {
    console.log(error);
  }
  return {
    updatedWorkplaceChannels: data,
    updatedWorkplaceChannelsError: error,
  };
};

export const updateChannelRegulators = async (
  channelId: string,
  userId: string
) => {
  const supabase = await superbaseCreateClient();
  const { data, error } = await supabase.rpc("update_channel_regulators", {
    channel_id: channelId,
    new_regulator: userId,
  });

  if (error) {
    console.log(error);
    return;
  }
  return {
    data,
    error,
  };
};
