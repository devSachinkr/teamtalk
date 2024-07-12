"use client";
import { useWorkplaceStore } from "@/hooks/workplace";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const StatusBar = ({ currentStep, setCurrentStep }: Props) => {
  const router = useRouter();
  
  return (
    <div className="w-full  flex items-center justify-between mt-5">
      <div
        className={cn(
          `rounded-full h-2  w-[40%]`,
          currentStep === 1 ? "bg-[#4A154B]" : "bg-muted-foreground"
        )}
        onClick={() => {
          setCurrentStep(1);
          router.refresh();
        }}
      ></div>
      <div
        className={cn(
          `rounded-full h-2  w-[40%]`,
          currentStep === 2 ? "bg-[#4A154B]" : "bg-muted-foreground"
        )}
       
      ></div>
    </div>
  );
};

export default StatusBar;
