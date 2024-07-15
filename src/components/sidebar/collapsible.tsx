"use client";
import {
  Collapsible as ShadcnCollapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useColorTheme } from "@/providers/color-theme";
import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa6";
import Typography from "../global/typography";
import { cn } from "@/lib/utils";

type Props = {
  collapsibleTrigger?: string | React.ReactNode;
  collapsibleContent: string | React.ReactNode;
  text: string;
  addHandler?: () => void;
};

const Collapsible = ({
  collapsibleContent,
  collapsibleTrigger,
  text,
  addHandler,
}: Props) => {
  const [isChannelCollapsed, setIsChannelCollapsed] = useState(true);
  const { colorTheme } = useColorTheme();
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
    <ShadcnCollapsible
      className="flex flex-col  gap-2"
      open={isChannelCollapsed}
      onOpenChange={() => setIsChannelCollapsed((prev) => !prev)}
    >
      <div className="flex items-center justify-between">
        <CollapsibleTrigger className="flex items-center gap-2">
          {isChannelCollapsed ? <FaArrowDown /> : <FaArrowUp />}
          {collapsibleTrigger}
          <Typography text={text} variant="p" className="font-bold" />
        </CollapsibleTrigger>
        <div
          className={cn(
            "cursor-pointer p-2 rounded-full transition-all duration-300",
            hoverBg
          )}
          onClick={addHandler}
        >
          <FaPlus  />
        </div>
      </div>
      <CollapsibleContent>{collapsibleContent}</CollapsibleContent>
    </ShadcnCollapsible>
  );
};

export default Collapsible;
