import { Editor } from "@tiptap/react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../ui/button";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
} from "lucide-react";
import Typography from "../global/typography";
import EmojiPicker from "./emoji-picker";

type Props = {
  editor: Editor;
};

const ChannelMenubar = ({ editor }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center flex-wrap gap-2 absolute z-10 top-0 left-0 w-full p-2 bg-neutral-400 dark:bg-neutral-900 rounded-md">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "border-[2px] border-dashed border-orange-400"
            : " border-[2px] border-dashed border-white"
        }
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "border-[2px] border-dashed border-orange-400"
            : " border-[2px] border-dashed border-white"
        }
      >
        <Italic className="w-4 h-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "border-[2px] border-dashed border-orange-400"
            : " border-[2px] border-dashed border-white"
        }
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "border-[2px] border-dashed border-orange-400"
            : " border-[2px] border-dashed border-white"
        }
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "border-[2px] border-dashed border-orange-400"
            : " border-[2px] border-dashed border-white"
        }
      >
        <Strikethrough className="w-4 h-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "border-[2px] border-dashed border-orange-400"
            : " border-[2px] border-dashed border-white"
        }
      >
        <SquareCode className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "border-[2px] border-dashed border-orange-400"
            : " border-[2px] border-dashed border-white"
        }
      >
        <Code className="w-4 h-4" />
      </Button>
      <EmojiPicker editor={editor}/>
    </div>
  );
};

export default ChannelMenubar;
