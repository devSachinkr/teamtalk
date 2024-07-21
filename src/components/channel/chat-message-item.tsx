"use client";
import { Channel, USER } from "@/types/app";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Typography from "../global/typography";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineAssistantPhoto,
} from "react-icons/md";
import { useChat, useChatEdit } from "@/hooks/chat";
import Link from "next/link";
import Image from "next/image";
import EditableContent from "./editable-content";
import { Trash2, Edit } from "lucide-react";
import { Separator } from "../ui/separator";
import { useModal } from "@/providers/modal-provider";
import Dialog from "../global/Dialog";
import Card from "../global/Card";
import { Button } from "../ui/button";

type Props = {
  id: string;
  content: string;
  user: USER ;
  timestamp: string;
  fileUrl?: string;
  deleted: boolean;
  currentUser: USER;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  channelData: Channel;
};

const ChatMessagesItem = ({
  channelData,
  content,
  currentUser,
  deleted,
  id,
  isUpdated,
  socketQuery,
  socketUrl,
  timestamp,
  user,
  fileUrl,
}: Props) => {
  const { setIsEditing, isEditing, handleDelete, loading } = useChatEdit({
    content,
    socketQuery,
    socketUrl,
    messageId: id,
  });
  const { setOpen, setClose } = useModal();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const { fileType, publicUrl } = useChat(fileUrl!);

  if(!user) return
  const isSuperAdmin = currentUser.id === channelData?.user_id;
  const isRegulator =
    channelData?.regulators?.includes(currentUser.id) ?? false;
  const isOwner = currentUser.id === user?.id;
  const canDeleteMessage = !deleted && (isSuperAdmin || isRegulator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileType === "image" && fileUrl;

  const FilePreview = () => {
    return (
      <>
        {isImage && (
          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener_noreferrer"
            className="relative aspect-square rounded-md mt-2 overflow-hidden  border items-center bg-secondary h-28 w-48"
          >
            <Image
              src={publicUrl}
              alt={content ?? ""}
              fill
              className="object-cover"
            />
          </Link>
        )}
        {isPdf && (
          <div className="flex items-center flex-col justify-center gap-2 px-2 py-1 bordre rounded-md shadow bg-white dark:bg-gray-800 ">
            <Typography
              text={"Shared a file"}
              variant="p"
              className="text-md font-semibold text-muted-foreground dark:text-gray-200 "
            />
            <Link
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 ease-in-out"
              href={publicUrl}
              target="_blank"
              rel="noopener_noreferrer"
            >
              View PDF
            </Link>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="relative group flex items-center hover:bg-black/5 px-1 py-2 rounded transition w-full ">
      <div className="flex flex-col">
        <div className="flex gap-x-2">
          <div className="cursor-pointer hover:drop-shadow-md transition ">
            <Avatar>
              <AvatarImage
                src={user.avatar_url}
                alt={user.name ?? " "}
                className="object-cover w-full h-full "
              />
              <AvatarFallback className="bg-neutral-700">
                <Typography text={user.name?.slice(0, 2) ?? "UN"} />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center w-full gap-x-2">
            <div className="flex items-center gap-x-2">
              <Typography
                text={user.name ?? user.email ?? ""}
                variant="p"
                className="font-semibold text-sm hover:underline cursor-pointer"
              />
            </div>
            {isSuperAdmin && (
              <MdOutlineAdminPanelSettings className="w-5 h-5" />
            )}
            {isRegulator && <MdOutlineAssistantPhoto className="w-5 h-5" />}
            {isUpdated && !deleted && (
              <span className="text-xs">{"(edited)"}</span>
            )}

            <span>{timestamp}</span>
          </div>
        </div>
        <div
          className={`flex ${
            fileUrl ? "justify-end" : "justify-start ml-10"
          } w-full`}
        >
          <FilePreview />
          {!fileUrl && (
            <EditableContent
              content={content}
              deleted={deleted}
              isEditing={isEditing}
              messageId={id}
              socketQuery={socketQuery}
              socketUrl={socketUrl}
            />
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden absolute group-hover:flex flex-row gap-2 bg-white dark:bg-black dark:text-white text-black rounded-md p-2 top-0 -translate-y-1/3 right-0  items-center ">
          <Trash2
            className="cursor-pointer "
            size={20}
            onClick={() =>
              setOpen(
                <Dialog
                  dialogContent={
                    <Card
                      cardClasses="border-none"
                      cardTitle="Delete Message"
                      cardDesc="are you sure you want to delete this message?"
                      cardFooter="once deleted, it cannot be undone"
                    >
                      <div className="flex items-center w-full justify-start gap-x-3">
                        <Button
                          variant={"destructive"}
                          onClick={() => handleDelete(id)}
                          disabled={loading}
                        >
                          {loading ? "Deleting..." : "Delete "}
                        </Button>
                        <Button variant={"default"} onClick={setClose}>
                          Cancel
                        </Button>
                      </div>
                    </Card>
                  }
                />
              )
            }
          />
          {canEditMessage && (
            <>
              <Separator className="h-4 bg-white" orientation="vertical" />
              <Edit
                className="cursor-pointer"
                size={20}
                onClick={() => setIsEditing((prev) => !prev)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessagesItem;
