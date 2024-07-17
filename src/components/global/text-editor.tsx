"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FiPlus } from "react-icons/fi";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import ChannelMenubar from "../channel/channel-menubar";
import React, { useState } from "react";
import ToastNotify from "./ToastNotify";
import axios from "axios";
import { Loader } from "./loader";
import { Spinner } from "./spinner";
import { useModal } from "@/providers/modal-provider";
import Dialog from "./Dialog";
import FileUpload from "./file-upload";
import Card from "./Card";
import { USER, Workplaces } from "@/types/app";
import ChatFileUpload from "../channel/chat-file-upload";
import { useColorTheme } from "@/providers/color-theme";
type Props = {
  apiUrl: string;
  type: "Channels" | "DirectMessage";
  channelId: string;
  workplaceId: string;
  workplace: Workplaces;
  user: USER;
  recipientId: string | undefined;
};
const TextEditor = ({
  apiUrl,
  type,
  channelId,
  workplaceId,
  workplace,
  user,
  recipientId,
}: Props) => {
  const { channels } = useColorTheme();
  const channel = channels?.find((channel) => channel?.id === channelId);
  const [content, setContent] = useState<string>("");
  const { setOpen } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What's happening?",
      }),
    ],
    autofocus: true,
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });
  const sendMessage = async () => {
    setLoading(true);
    if (content.length < 2) {
      return ToastNotify({
        title: "Oppse",
        msg: "Message should be at least 2 character",
      });
    }
    try {
      const payload = {
        content,
        type,
      };
      let endpoint = apiUrl;
      if (type === "Channels" && channelId) {
        endpoint += `?channelId=${channelId}&workplaceId=${workplaceId}`;
      } else if (type === "DirectMessage" && recipientId) {
        endpoint += `?recipientId=${recipientId}&workplaceId=${workplaceId}`;
      }
      const res = await axios.post(endpoint, payload);
      setContent("");
      editor?.commands.clearContent();
      ToastNotify({
        title: "Success",
        msg: "Message sent successfully",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fileUploadModal = () => {
    setOpen(
      <Dialog
        dialogContent={
          <Card
            cardTitle="Upload an image "
            cardClasses="border-none"
            cardDesc="Choose a file which you want to share with your team."
          >
            <ChatFileUpload
              workplace={workplace}
              channelId={channelId}
              user={user}
              recipientId={recipientId}
            />
          </Card>
        }
      />
    );
  };
  return (
    <div className="border dark:border-zinc-500 border-gray-900 rounded-md relative overflow-hidden p-1 ">
      <div className="sticky top-0 z-10">
        {editor && <ChannelMenubar editor={editor} />}
      </div>
      <div className="h-[150px] pt-11 flex w-full grow-1 ">
        <EditorContent
          className=" prose w-full mt-5 h-full dark:text-white leading-[1.15px] overflow-y-hidden whitespace-pre-wrap"
          editor={editor}
        />
      </div>
      <div
        className="absolute top-3 z-10 right-3 bg-black
       dark:bg-white cursor-pointer transition-all
        duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6"
      >
        <FiPlus
          onClick={fileUploadModal}
          size={28}
          className="dark:text-black"
        />
      </div>
      <Button
        size={"sm"}
        className="absolute bottom-3 right-3 bg-blue-600 text-white hover:bg-blue-600/80 hover:scale-110 transition-all duration-300"
        disabled={content.length < 2 || loading}
        onClick={sendMessage}
      >
        {loading ? <Spinner /> : <SendHorizonal />}
      </Button>
    </div>
  );
};

export default TextEditor;
