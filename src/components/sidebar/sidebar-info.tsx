"use client";
import { cn } from "@/lib/utils";
import { useColorTheme } from "@/providers/color-theme";
import React from "react";

type Props = {};

const SidebarInfo = (props: Props) => {
  const { colorTheme } = useColorTheme();
  let bg_color = "bg-primary-light";

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
  return (
    <div
      className={cn(
        "fixed left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center",
        bg_color
      )}
    >
        
      SidebarInfo
    </div>
  );
};

export default SidebarInfo;
