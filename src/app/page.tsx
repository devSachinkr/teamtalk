import { getUserData } from "@/actions/get-user-data";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const page = async ({ children }: Props) => {
  const user = await getUserData();
  if (!user) {
    return redirect("/sign-in");
  }
  const userWorkplacesId = user.data?.workplaces?.[0];
  if (!userWorkplacesId) return redirect("/create-workplace");
  return redirect(`/workplace/${userWorkplacesId}`);
};

export default page;
