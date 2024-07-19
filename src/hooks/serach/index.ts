'use client';
import {  updateChannelMembers, updateChannelRegulators, updateUserChannels } from "@/actions/create-channel";
import ToastNotify from "@/components/global/ToastNotify";
import { useColorTheme } from "@/providers/color-theme";
import { Workplaces } from "@/types/app";
import { useRouter } from "next/navigation";

type useSearchProps = {
  currentWorkPlace: Workplaces;
  channelId: string;
  loggedInUser: string;
};
export const useSearch = ({
  channelId,
  currentWorkPlace,
  loggedInUser,
}: useSearchProps) => {
  const { channels, colorTheme } = useColorTheme();
  const channel = channels?.find((channel) => channel?.id === channelId);
  const router = useRouter();

  let bg_color = "bg-[#7a4a7f] dark:bg-[#311834]";
  switch (colorTheme) {
    case "blue":
      bg_color = "bg-blue-200 dark:bg-blue-900";
      break;
    case "green":
      bg_color = "bg-green-200 dark:bg-green-900";
      break;
    case "red":
      bg_color = "bg-red-200 dark:bg-red-900";
      break;
    case "yellow":
      bg_color = "bg-yellow-200 dark:bg-yellow-900";
      break;
    case "indigo":
      bg_color = "bg-indigo-200 dark:bg-indigo-900";
      break;
    case "purple":
      bg_color = "bg-purple-200 dark:bg-purple-900";
      break;
    case "pink":
      bg_color = "bg-pink-200 dark:bg-pink-900";
      break;
    case "orange":
      bg_color = "bg-orange-200 dark:bg-orange-900";
      break;
    case "cyan":
      bg_color = "bg-cyan-200 dark:bg-cyan-900";
      break;
    case "gray":
      bg_color = "bg-gray-200 dark:bg-gray-900";
      break;
    case "primary":
      bg_color = "bg-primary/90 dark:bg-primary/50";
      break;
    case "slate":
      bg_color = "bg-slate-200 dark:bg-slate-900";
      break;
    default:
      break;
  }

  const isChannelMember = (memberId: string) => {
    return channel?.members?.includes(memberId) ?? false;
  };

  const isRegulator = (memberId: string) => {
    return channel?.regulators?.includes(memberId) ?? false;
  };
  const isChannelOwner = (memberId: string) => {
    return channel?.user_id === memberId ?? false;
  };

  const makeUserRegulator = async (memberId: string, channelId: string) => {
    await updateChannelRegulators(channelId,memberId);
    router.refresh();
    ToastNotify({
      title: "Success",
      msg: "User is now a channel regulator",
    });
  };
  const addUserToChannel = async (memberId: string, channelId: string) => {
    await updateChannelMembers(channelId,memberId);
    await updateUserChannels(memberId, channelId);
    
    router.refresh();
    ToastNotify({
      title: "Success",
      msg: "User added to channel",
    });
  };

  return {
    bg_color,
    isChannelMember,
    isRegulator,
    isChannelOwner,
    channel,
    makeUserRegulator,
    addUserToChannel,
  };
};
