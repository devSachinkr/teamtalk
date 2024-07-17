"use client";
import { useChannelFileUpload } from "@/hooks/channel";
import { USER, Workplaces } from "@/types/app";
import React from "react";
import { v4 } from "uuid";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "../global/loader";

type Props = {
  workplace: Workplaces;
  channelId: string;
  user: USER;
  recipientId?: string | undefined;
};

const ChatFileUpload = ({ channelId, workplace, user,recipientId }: Props) => {
  const { form, handleUpload, imageRef,loading } = useChannelFileUpload({
    channelId,
    workplace,
    user,
    recipientId
  });
  return (
    <Form {...form}>
      <form onSubmit={handleUpload}>
        <FormField
          name="file"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="file">File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...imageRef}
                  id="file"
                  accept="image/*,application/pdf"
                  placeholder="Choose file"
                  onChange={(e) => {
                    field.onChange(e.target?.files);
                  }}
                />
              </FormControl>
              <FormDescription>
                Drag and drop images , files here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <Loader loading={loading}>
            <Button type="submit" >Upload</Button>
          </Loader>
        </div>
      </form>
    </Form>
  );
};

export default ChatFileUpload;
