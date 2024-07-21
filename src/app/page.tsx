import { getUserData } from "@/actions/get-user-data";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserData();
  if (!user?.data) {
    return redirect("/sign-in");
  }
  const userWorkplacesId = user.data?.workplaces?.[0];
  if (!userWorkplacesId) return redirect("/create-workplace");
  return redirect(`/workplace/${userWorkplacesId}`);
};

export default page;
