"use client";
import { cn } from "@/lib/utils";
import { useColorTheme } from "@/providers/color-theme";
import { useTheme } from "next-themes";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Theme: FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  const { colorTheme } = useColorTheme();
  let bg_color = "bg-primary-dark";

  switch (colorTheme) {
    case "blue":
      bg_color = "bg-blue-700";
      break;
    case "green":
      bg_color = "bg-green-700";
      break;
    case "red":
      bg_color = "bg-red-700";
      break;
    case "yellow":
      bg_color = "bg-yellow-700";
      break;
    case "indigo":
      bg_color = "bg-indigo-700";
      break;
    case "purple":
      bg_color = "bg-purple-700";
      break;
    case "pink":
      bg_color = "bg-pink-700";
      break;
    case "orange":
      bg_color = "bg-orange-700";
      break;
    case "cyan":
      bg_color = "bg-cyan-700";
      break;
    case "gray":
      bg_color = "bg-gray-700";
      break;
    case "slate":
      bg_color = "bg-slate-700";
      break;
    case "primary":
      bg_color = "bg-primary-dark";
      break;
    default:
      bg_color = "bg-background";
      break;
  }
  return (
    <div className={cn("md:px-2 md:pb-2 md:h-screen md:pt-14", bg_color)}>
      <main
        className={cn(
          "md:ml-[280px] lg:ml-[420px] md:h-full overflow-y-hidden",
          theme === "dark" ? "bg-[#232529]" : "bg-white"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Theme;
