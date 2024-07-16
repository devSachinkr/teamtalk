"use client";
import React from "react";
import Typography from "./typography";
import { Button } from "../ui/button";
import { useModal } from "@/providers/modal-provider";
import ChannelForm from "../forms/channel/channel-form";
import Dialog from "./Dialog";

type Props = {
  workplaceName: string;
  userId: String;
  workplaceId: string;
};

const NochannelScreen = ({ userId, workplaceId, workplaceName }: Props) => {
  const { setOpen } = useModal();
  return (
    <div className="w-full h-[calc(100vh-63px)] p-4">
      <Typography
        text={`👋 welcome to #${workplaceName} workplace ✨`}
        variant={`h3`}
      />
      <Typography
        text="Get started by creating a new channel or direct message!"
        variant="p"
        className="text-muted-foreground my-3"
      />
      <div className="w-fit">
        <Button
          type="button"
          className="w-full my-2"
          onClick={() => {
            setOpen(
              <Dialog
                dialogContent={<ChannelForm workplaceId={workplaceId} />}
              />
            );
          }}
        >
          <Typography text="Create new channel" variant="p" />
        </Button>
      </div>
    </div>
  );
};

export default NochannelScreen;
