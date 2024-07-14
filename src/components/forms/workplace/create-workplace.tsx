"use client";
import Typography from "@/components/global/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import Step1 from "./step1";
import Step2 from "./step2";
import { useWorkplaceStore } from "@/hooks/workplace";

type Props = {};

const WorkplaceForm = (props: Props) => {
  const { currentStep } = useWorkplaceStore();
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>
          <Typography text="Create a new workplace" variant="h2" />
        </CardTitle>
        <CardDescription className="mt-2">
          <Typography
            text="Create a new workplace with a stunning ui."
            variant="p"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>{currentStep === 1 ? <Step1 /> : <Step2 />}</CardContent>
    </Card>
  );
};

export default WorkplaceForm;
