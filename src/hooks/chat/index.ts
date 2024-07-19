"use client";

import ToastNotify from "@/components/global/ToastNotify";
import { supabaseClient } from "@/lib/supabase/create-client";
import { useModal } from "@/providers/modal-provider";
import { useWebSocket } from "@/providers/web-socket";
import { chatFormSchema } from "@/schema/form";
import { MessageWithUser } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useChat = (filePath: string) => {
  const [publicUrl, setPublicUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const supabase = supabaseClient;

  const fetchFile = async () => {
    setLoading(true);
    try {
      const {
        data: { publicUrl },
      } = await supabase.storage.from("guardian-store").getPublicUrl(filePath);

      if (publicUrl) {
        setPublicUrl(publicUrl);
        if (filePath.startsWith("chat/img")) {
          setFileType("image");
        } else if (filePath.startsWith("chat/pdf-")) {
          setFileType("pdf");
        }
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    filePath && fetchFile();
  }, [filePath, supabase.storage]);

  return {
    publicUrl,
    fileType,
    loading,
    error,
  };
};

export const useChatEdit = ({
  content,
  messageId,
  socketQuery,
  socketUrl,
}: {
  content: string;
  socketUrl?: string;
  socketQuery?: Record<string, string>;
  messageId?: string;
}) => {
  const { setClose } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof chatFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      content: content ?? "",
    },
  });
  const { handleSubmit } = form;
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = handleSubmit(
    async ({ content }: z.infer<typeof chatFormSchema>) => {
      const url = `${socketUrl}/${messageId}?${new URLSearchParams(
        socketQuery
      )}`;
      await axios.patch(url, { content });
      setIsEditing(false);
      form.reset();
      router.refresh();
    }
  );
  const handleDelete = async (messageId: string) => {
    const url = `${socketUrl}/${messageId}?${new URLSearchParams(socketQuery)}`;
    setLoading(true);
    await axios.delete(url);
    setClose();
    setLoading(false);
    router.refresh();
  };
  useEffect(() => {
    form.reset({
      content,
    });
  }, [content, form]);

  return {
    isEditing,
    form,
    handleEdit,
    loading,
    setIsEditing,
    handleDelete,
  };
};

type UserChatConnection = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  paramValue: string;
};

export const useChatSocketConnection = ({
  addKey,
  paramValue,
  queryKey,
  updateKey,
}: UserChatConnection) => {
  const { socket } = useWebSocket();
  const queryClient = useQueryClient();

  const handleUpdateMessage = (message: any) => {
    queryClient.setQueryData([queryKey, paramValue], (data: any) => {
      if (!data || !data.pages || !data.pages.length) {
        return data;
      }
      const newData = data.pages.map((page: any) => {
        return {
          ...page,
          data: page.data.map((d: MessageWithUser) => {
            if (d.id === message.id) {
              return message;
            }
            return d;
          }),
        };
      });
      return {
        ...data,
        pages: newData,
      };
    });
  };

  const handleAddMessage = (message: MessageWithUser) => {
    queryClient.setQueryData([queryKey, paramValue], (data: any) => {
      if (!data || !data.pages || data.pages.length === 0) {
        return data;
      }
      const newPages = [...data.pages];
      newPages[0] = {
        ...newPages[0],
        data: [...newPages[0].data, message],
      };

      return {
        ...data,
        pages: newPages,
      };
    });
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(addKey, (message: MessageWithUser) => {
      handleAddMessage(message);
    });
    socket.on(updateKey, (message: MessageWithUser) => {
      handleUpdateMessage(message);
    });

    return () => {
      socket.off(addKey, handleAddMessage);
      socket.off(updateKey, handleUpdateMessage);
    };
  }, [socket, addKey, updateKey, queryClient, queryKey]);
};

export const useChatScrollRef = ({
  bottomRef,
  chatRef,
  count,
}: {
  chatRef: RefObject<HTMLDivElement>;
  bottomRef: RefObject<HTMLDivElement>;
  count: number;
}) => {
  const [hasInitilized, setHasInitilized] = useState(false);
  useEffect(() => {
    const bottomDiv = bottomRef.current;
    const topDiv = chatRef.current;
    const autoScroll = () => {
      if (!hasInitilized || bottomDiv) {
        setHasInitilized(true);
        return true;
      }
      if (!topDiv) {
        return false;
      }
      const distanceFromBottom = topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (autoScroll()) {
      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [bottomRef, chatRef, hasInitilized, count]);
};
