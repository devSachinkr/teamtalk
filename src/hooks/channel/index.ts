"use client";

import { createChannel } from "@/actions/create-channel";
import { getChannels } from "@/actions/get-channels";
import ToastNotify from "@/components/global/ToastNotify";
import { supabaseClient } from "@/lib/supabase/create-client";
import { useColorTheme } from "@/providers/color-theme";
import { useModal } from "@/providers/modal-provider";
import { createChannelSchema, channelUploadFileSchema } from "@/schema/form";
import { Channel, USER, Workplaces } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

export const useChannel = ({ workplaceId }: { workplaceId: string }) => {
  const { setClose } = useModal();
  const form = useForm<z.infer<typeof createChannelSchema>>({
    mode: "onChange",
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit } = form;
  const { setChannels, channels } = useColorTheme();
  const getWorkplaceData = async () => {
    const res = await getChannels(workplaceId);
    // @ts-ignore
    setChannels(res);
    return res;
  };

  const handleCreate = handleSubmit(
    async (data: z.infer<typeof createChannelSchema>) => {
      setLoading(true);
      const res = await createChannel(data.name, workplaceId);
      if (res?.error) {
        ToastNotify({
          title: "Oppse",
          msg: res.message,
        });
        console.log(res.error);
      }
      ToastNotify({
        title: "Success",
        msg: `${res?.message}`,
      });
      await getWorkplaceData();
      setClose();
      router.refresh();
      setLoading(false);
    }
  );
  useEffect(() => {
    form.reset({
      name: "",
    });
  }, [workplaceId]);
  useEffect(() => {
    getWorkplaceData();
  }, [workplaceId]);
  return {
    form,
    handleCreate,
    loading,
    getWorkplaceData,
    channels,
  };
};

export const useChannelFileUpload = ({
  channelId,
  workplace,
  user,
}: {
  channelId: string;
  workplace: Workplaces;
  user: USER;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof channelUploadFileSchema>>({
    resolver: zodResolver(channelUploadFileSchema),
    mode: "onChange",
    defaultValues: {
      file: undefined,
    },
  });
  const imageRef = form.register("file");
  const router = useRouter();
  const { handleSubmit } = form;
  const handleUpload = handleSubmit(
    async (values: z.infer<typeof channelUploadFileSchema>) => {
      setLoading(true);
      const id = v4();
      if (!values.file?.[0]) {
        ToastNotify({
          title: "Oppse",
          msg: "Please select a file",
        });
        setLoading(false);
        return;
      }
      const file = values.file[0];
      const supabase = supabaseClient;

      let fileTypePrefix = "";

      if (file.type === "application/pdf") {
        fileTypePrefix = "pdf";
      } else if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        fileTypePrefix = "img";
      }
      const fileName = `chat/${fileTypePrefix}-${id}.${file.name
        .split(".")
        .pop()}`;

      const { data, error } = await supabase.storage
        .from("guardian-store")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        ToastNotify({
          title: "Oppse",
          msg: error.message,
        });
        console.log(error);
        setLoading(false);
        return;
      }
      const { error: messageError } = await supabase.from("messages").insert({
        file_url: data.path,
        userId: user.id,
        workplace_id: workplace.id,
        channel_id: channelId,
      });

      if (messageError) {
        ToastNotify({
          title: "Oppse",
          msg: messageError.message,
        });
        console.log(messageError);
        setLoading(false);
        return;
      }
      ToastNotify({
        title: "Success",
        msg: "File uploaded successfully",
      });
      form.reset();
      router.refresh();

      setLoading(false);
    }
  );

  return {
    form,
    handleUpload,
    imageRef,
    loading,
  };
};
