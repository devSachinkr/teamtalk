"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const Collapsible2 = () => {
  const [isDirectMessagesCollapsed, setIsDirectMessagesCollapsed] =
    useState(false);
  return (
    <Collapsible
      className="flex flex-col gap-2"
      open={isDirectMessagesCollapsed}
      onOpenChange={() => setIsDirectMessagesCollapsed((prev) => !prev)}
    >  
    
      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Collapsible2;
