import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplace } from "@/actions/get-user-workspace";
import { getCurrentWorkplace } from "@/actions/get-workspace";
import Typography from "@/components/global/typography";
import Sidebar from "@/components/sidebar";
import SidebarInfo from "@/components/sidebar/sidebar-info";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    channelId: string;
    workplaceId: string;
  };
};

const page = async ({ params: { channelId, workplaceId } }: Props) => {
  const userData = await getUserData();
  if (!userData) {
    return redirect("/sign-in");
  }
  const { data, error } = await getUserWorkplace(userData.data?.workplaces!);
  const workplace = await getCurrentWorkplace(workplaceId);

  return (
    <div>
      <div className="hidden md:block">
        <Sidebar
          currentWorkPlace={workplace.data!}
          user={userData.data!}
          userWorkPlaceData={data!}
        />
        <SidebarInfo />
        <div>
        <Typography text="hlo hi" variant="p"/>
        </div>
      </div>
    </div>
  );
};

export default page;
