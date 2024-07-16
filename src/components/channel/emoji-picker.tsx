"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import { Editor } from "@tiptap/react";
const EmojiPicker = ({ editor }: { editor: Editor }) => {
  const { resolvedTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Smile size={26} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 ">
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) =>
            editor.chain().focus().insertContent(emoji.native).run()
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
