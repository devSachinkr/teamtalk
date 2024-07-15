"use client";

import { createChannel } from "@/actions/create-channel";
import { getChannels } from "@/actions/get-channels";
import ToastNotify from "@/components/global/ToastNotify";
import { useColorTheme } from "@/providers/color-theme";
import { useModal } from "@/providers/modal-provider";
import { createChannelSchema } from "@/schema/form";
import { Channel } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
 const {setChannels,channels}=useColorTheme();
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
