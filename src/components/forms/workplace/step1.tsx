"use client";
import StatusBar from "@/components/global/status-bar";
import Typography from "@/components/global/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWorkplace, useWorkplaceStore } from "@/hooks/workplace";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const Step1 = (props: Props) => {
  const {  setCurrentStep, currentStep } = useWorkplaceStore();
  const { form, onSubmitStepOne } = useWorkplace();
  return (
    <div>
      <Typography
        text="Name of your company"
        className="my-4 font-serif"
        variant="h1"
      />
      <Typography
        text="This will be the name of your workspace on TeamTalk"
        variant="p"
        className="text-muted-foreground"
      />
      <Form {...form}>
        <form onSubmit={onSubmitStepOne}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex mt-7 mb-2 text-muted-foreground">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 w-full bg-primary-dark hover:bg-primary-dark/80 text-white font-semibold">
            Continue
          </Button>
        </form>
      </Form>

      <StatusBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default Step1;
