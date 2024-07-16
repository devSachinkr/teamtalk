import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplace } from "@/actions/get-user-workspace";
import { getCurrentWorkplace } from "@/actions/get-workspace";
import NochannelScreen from "@/components/global/no-channel-screen";
import Sidebar from "@/components/sidebar";
import SidebarInfo from "@/components/sidebar/sidebar-info";
import { Workplaces } from "@/types/app";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    workplaceId: string;
  };
};

const page = async ({ params: { workplaceId } }: Props) => {
  const userData = await getUserData();
  if (!userData) {
    return redirect("/sign-in");
  }
  const { data, error } = await getUserWorkplace(userData.data?.workplaces!);
  //  @ts-ignore
  const workplace:{data:Workplaces} = await getCurrentWorkplace(workplaceId);
  if(workplace.data?.channels?.length){
    return redirect(`/workplace/${workplaceId}/channel/${workplace.data?.channels[0]}`)
  }
  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkPlace={workplace.data!}
          user={userData.data!}
          userWorkPlaceData={data!}
        />
        <SidebarInfo />

        <NochannelScreen
          userId={userData.data?.id!}
          workplaceId={workplace.data?.id!}
          workplaceName={workplace.data?.name!}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobilesds</div>
    </>
  );
};

export default page;
