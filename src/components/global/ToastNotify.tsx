import { X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
type Props = {
  title: "Oppse" | "Success";
  msg: string;
};

const ToastNotify = ({ msg, title }: Props) => {
  toast(title, {
    description: msg,
    action: {
      label: "X",
      onClick: () => toast.dismiss(),
    },
    className:'z-[1000000]',
  });
};

export default ToastNotify;
