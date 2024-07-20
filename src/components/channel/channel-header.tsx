"use client";
import React from "react";
import Typography from "../global/typography";
import { IoMdHeadset } from "react-icons/io";
import { useColorTheme } from "@/providers/color-theme";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const ChannelHeader = () => {
  const { channels } = useColorTheme();
  //@ts-ignore
  const { channelId,id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleCall = () => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    if (currentParams.has('call')) {
      currentParams.delete('call');
    } else {
      currentParams.set('call', 'true');
    }
    router.push(`?${currentParams.toString()}`);
  };
  const channel =
    channels?.find((channel) => channel?.id === channelId) ?? null;
  
  return (
    <div className="absolute z-20 h-10 top-0 left-0 w-full">
      <div className="h-14 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-accent border-b border-b-white/30 shadow-md ">
        <Typography text={`# ${channel?.name }`} variant="h3" />
        <IoMdHeadset onClick={handleCall} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ChannelHeader;
