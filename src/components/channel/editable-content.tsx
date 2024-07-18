"use client";
import { useChatEdit } from "@/hooks/chat";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "../global/loader";

type Props = {
  deleted: boolean;
  isEditing: boolean;
  content: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  messageId: string;
};

const EditableContent = ({
  deleted,
  content,
  isEditing,
  messageId,
  socketQuery,
  socketUrl,
}: Props) => {
  const { form, handleEdit, loading } = useChatEdit({ content,messageId,socketQuery,socketUrl });
  return isEditing ? (
    <Form {...form}>
      <form onSubmit={handleEdit}>
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="p-2 border-none bg-transparent boder-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormDescription>Press Esc to cancel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end w-full mt-3">
          <Loader loading={loading}>
            <Button type="submit">Update</Button>
          </Loader>
        </div>
      </form>
    </Form>
  ) : (
    <div
      className={cn("text-sm opacity-90 h", deleted)}
      dangerouslySetInnerHTML={{ __html: content ?? "" }}
    />
  );
};

export default EditableContent;
