import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  children?: React.ReactNode;
  content: string | React.ReactNode;
  triggerClasses?: string;
  value?: string;
  side?: "top" | "bottom" | "left" | "right";
  contentClasses?: string;
};

const ToolTip = ({ children, content, triggerClasses, value,side,contentClasses }: Props) => {
  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild className={triggerClasses} value={value}>
            {children}
          </TooltipTrigger>
          <TooltipContent side={side} className={contentClasses}>{content}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToolTip;
