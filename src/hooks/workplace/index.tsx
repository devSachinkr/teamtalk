"use client";
import Step1 from "@/components/forms/workplace/step1";
import Step2 from "@/components/forms/workplace/step2";
import {
  workspaceFormSchemaStep1,
  workspaceFormSchemaStep2,
} from "@/schema/form";
import slugify from "slugify";
import { v4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { create } from "zustand";
import { createWorkSpace } from "@/actions/create-work-space";
import ToastNotify from "@/components/global/ToastNotify";
import { useModal } from "@/providers/modal-provider";
type CreateWorkSpaceValues = {
  name: string;
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (values: Partial<CreateWorkSpaceValues>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};
export const useWorkplaceStore = create<CreateWorkSpaceValues>((set) => ({
  name: "",
  currentStep: 1,
  updateImageUrl: (url) => set((state) => ({ ...state, imageUrl: url })),
  updateValues: (values) => set((state) => ({ ...state, ...values })),
  imageUrl: "",
  setCurrentStep: (step) => set((state) => ({ ...state, currentStep: step })),
}));

export const useWorkplace = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, setClose } = useModal();

  const form = useForm<z.infer<typeof workspaceFormSchemaStep1>>({
    mode: "onChange",
    resolver: zodResolver(workspaceFormSchemaStep1),
    defaultValues: {
      name: useWorkplaceStore.getState().name ?? "",
    },
  });
  const steptwoForm = useForm<z.infer<typeof workspaceFormSchemaStep2>>({
    mode: "onChange",
    resolver: zodResolver(workspaceFormSchemaStep2),
    defaultValues: {
      imageUrl: useWorkplaceStore.getState().imageUrl ?? "",
    },
  });

  const { handleSubmit } = form;
  const router = useRouter();

  const onSubmitStepOne = handleSubmit(
    (data: z.infer<typeof workspaceFormSchemaStep1>) => {
      useWorkplaceStore.getState().updateValues({ name: data.name });
      useWorkplaceStore.getState().setCurrentStep(2);
      router.refresh();
    }
  );

  const onSubmitStepTwo = steptwoForm.handleSubmit(
    async (data: z.infer<typeof workspaceFormSchemaStep2>) => {
      setLoading(true);
      const slug = slugify(useWorkplaceStore.getState().name);
      const invite_code = v4();
      const error = await createWorkSpace({
        name: useWorkplaceStore.getState().name,
        image: data.imageUrl!,
        slug,
        invite_code,
      });
      if (error?.error) {
        console.log(error?.error);
        ToastNotify({
          title: "Oppse",
          msg: "Failed to create workplace. Please try again",
        });
      }
      ToastNotify({
        title: "Success",
        msg: "Workplace created successfully",
      });
      if (isOpen) {
        setClose();
      }
      router.push("/");
      setLoading(false);
    }
  );
  let stepInView = null;
  switch (useWorkplaceStore.getState().currentStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
      break;
  }

  return {
    stepInView,
    onSubmitStepOne,
    form,
    steptwoForm,
    onSubmitStepTwo,
    loading,
  };
};
