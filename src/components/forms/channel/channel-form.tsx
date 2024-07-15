"use client";
import Card from "@/components/global/Card";
import { Loader } from "@/components/global/loader";
import Typography from "@/components/global/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChannel } from "@/hooks/channel";
import React from "react";

type Props = {
  workplaceId: string;
};
const ChannelForm = ({ workplaceId }: Props) => {
  const { form, handleCreate, loading } = useChannel({ workplaceId });
  return (
    <Card
      cardTitle={<Typography text="Create Channel" variant="h2" />}
      cardDesc={
        <Typography
          text="Create a new channel with a stunning ui."
          variant="p"
        />
      }
      cardClasses="border-none"
    >
      <Form {...form}>
        <form onSubmit={handleCreate}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel name</FormLabel>
                <FormControl>
                  <Input placeholder="Channel name" {...field} />
                </FormControl>
                <FormDescription>what we call your channel ?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end my-5 w-full">
            <Loader loading={loading}>
              <Button type="submit" className="bg-primary-dark hover:bg-primary-dark/80 text-white">
                <Typography text="Create" variant="p" />
              </Button>
            </Loader>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ChannelForm;
