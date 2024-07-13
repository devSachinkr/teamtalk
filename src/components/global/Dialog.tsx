"use client";
import React from "react";
import {
  Dialog as ShadCnDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/modal-provider";
import { Separator } from "../ui/separator";

type Props = {
  dialogContent: React.ReactNode | string;
};

const Dialog = ({ dialogContent }: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <ShadCnDialog  open={isOpen} onOpenChange={setClose}>
      <DialogContent className="w-full">{dialogContent}</DialogContent>
    </ShadCnDialog>
  );
};

export default Dialog;
