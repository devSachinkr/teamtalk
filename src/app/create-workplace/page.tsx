"use client";
import Typography from "@/components/global/typography";
import { useWorkplace, useWorkplaceStore } from "@/hooks/workplace";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { stepInView } = useWorkplace();
  const { currentStep } = useWorkplaceStore();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="p-3 max-w-[550px] text-center">
        <Typography
          variant="p"
          text={`${currentStep} of 2`}
          className="mb-3 text-muted-foreground"
        />
        {stepInView}
      </div>
    </div>
  );
};

export default Page;
