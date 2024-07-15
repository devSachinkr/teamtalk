"use client";
import { cn } from "@/lib/utils";
import { useColorTheme } from "@/providers/color-theme";
import React from "react";
import Collapsible2 from "./collapsible2";
import Collapsible from "./collapsible";
import Typography from "../global/typography";
import { useModal } from "@/providers/modal-provider";
import Dialog from "../global/Dialog";
import ChannelForm from "../forms/channel/channel-form";
import { useParams } from "next/navigation";
import { useChannel } from "@/hooks/channel";
import Link from "next/link";
import { Workplaces } from "@/types/app";

type Props = {};

const SidebarInfo = () => {
  const { workplaceId, channelId } = useParams();
  const { colorTheme ,color} = useColorTheme();
  let bg_color = "bg-primary-light";
  const { setOpen } = useModal();
  const { channels } = useChannel({
    workplaceId: String(workplaceId),
  });
  switch (colorTheme) {
    case "blue":
      bg_color = "bg-blue-900";
      break;
    case "green":
      bg_color = "bg-green-900";
      break;
    case "red":
      bg_color = "bg-red-900";
      break;
    case "yellow":
      bg_color = "bg-yellow-900";
      break;
    case "indigo":
      bg_color = "bg-indigo-900";
      break;
    case "purple":
      bg_color = "bg-purple-900";
      break;
    case "pink":
      bg_color = "bg-pink-900";
      break;
    case "orange":
      bg_color = "bg-orange-900";
      break;
    case "cyan":
      bg_color = "bg-cyan-900";
      break;
    case "gray":
      bg_color = "bg-gray-900";
      break;
    case "slate":
      bg_color = "bg-slate-900";
      break;
    case "primary":
      bg_color = "bg-primary-light";
      break;
    default:
      bg_color = "bg-background/30";
      break;
  }

  let hoverBg = "hover:bg-primary-dark";
  switch (colorTheme) {
    case "blue":
      hoverBg = "hover:bg-blue-600";
      break;
    case "green":
      hoverBg = "hover:bg-green-600";
      break;
    case "red":
      hoverBg = "hover:bg-red-600";
      break;
    case "yellow":
      hoverBg = "hover:bg-yellow-600";
      break;
    case "indigo":
      hoverBg = "hover:bg-indigo-600";
      break;
    case "purple":
      hoverBg = "hover:bg-purple-600";
      break;
    case "pink":
      hoverBg = "hover:bg-pink-600";
      break;
    case "orange":
      hoverBg = "hover:bg-orange-600";
      break;
    case "cyan":
      hoverBg = "hover:bg-cyan-600";
      break;
    case "gray":
      hoverBg = "hover:bg-gray-600";
      break;
    case "slate":
      hoverBg = "hover:bg-slate-600";
      break;
    case "primary":
      hoverBg = "hover:bg-primary-dark";
      break;
    default:
      hoverBg = "hover:bg-background/30";
      break;
  }
  return (
    <div
      className={cn(
        "fixed left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center",
        bg_color
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
        <div>
          <Collapsible
            text="Channels"
            addHandler={() => {
              setOpen(
                <Dialog
                  dialogContent={
                    <ChannelForm workplaceId={workplaceId as string} />
                  }
                />
              );
            }}
            collapsibleContent={
              channels?.length ? (
                channels?.map((c) => (
                  <Link
                    key={c?.id}
                    href={`/workplace/${workplaceId}/channel/${c?.id}`}
                  >
                    <Typography
                      variant="p"
                      text={`#${c?.name!}`}
                      className={cn(
                        "px-2 py-1 rounded-sm cursor-pointer",
                        hoverBg,
                        c?.id === channelId && "" 
                      )}
                    />
                  </Link>
                ))
              ) : (
                <Typography
                  text="No Channels Available | Add Channels Now!"
                  className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
                  variant="p"
                />
              )
            }
          />
        </div>
        <div>
          <Collapsible
            text="Direct Messages"
            collapsibleContent={
              <>
                <Typography
                  text="User Name-1"
                  className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
                  variant="p"
                />
                <Typography
                  text="User Name-1"
                  className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
                  variant="p"
                />
                <Typography
                  text="User Name-1"
                  className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
                  variant="p"
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarInfo;
