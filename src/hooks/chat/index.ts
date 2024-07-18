"use client";

import ToastNotify from "@/components/global/ToastNotify";
import { supabaseClient } from "@/lib/supabase/create-client";
import { useModal } from "@/providers/modal-provider";
import { chatFormSchema } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    const url=`${socketUrl}/${messageId}?${new URLSearchParams(socketQuery)}`
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
