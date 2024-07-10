import Typography from "@/components/global/typography";
import React from "react";
import logo from "../../../../../public/team-talk.png";
import Image from "next/image";
import LoginForm from "@/components/forms/login-form";
const page = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex  items-center pr-12">
          <Image src={logo} alt="app logo" width={100} height={100} />
          <Typography variant="h1" text="TeamTalk" />
      </div>
        <Typography
          text="Enter your credentials to sign in to your account"
          variant="p"
          className="text-muted-foreground"
        />
      <div className="flex w-full justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
