import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplace } from "@/actions/get-user-workspace";
import { getCurrentWorkplace } from "@/actions/get-workspace";
import ChannelHeader from "@/components/channel/channel-header";
import TextEditor from "@/components/global/text-editor";
import Typography from "@/components/global/typography";
import Sidebar from "@/components/sidebar";
import SidebarInfo from "@/components/sidebar/sidebar-info";
import { useColorTheme } from "@/providers/color-theme";
import { Channel } from "@/types/app";
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
    <div className="hidden md:block">
      <div className="h-[calc(100vh-256px)] overflow-y-auto  [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkPlace={workplace.data!}
          user={userData.data!}
          userWorkPlaceData={data!}
        />
        <SidebarInfo />
        <div className="p-4 relative overflow-hidden">
          <ChannelHeader />
          <div className="mt-14">
            <Typography
              variant="h4"
              text="Chat Content"
              className="text-muted-foreground"
            />
          </div>
        </div>
      </div>
      <div className="m-4">
        <TextEditor
          apiUrl="/api/web-socket/messages"
          type="channel"
          channelId={channelId}
          workplaceId={workplaceId}
          workplace={workplace.data!}
          user={userData.data!}
        />
      </div>
    </div>
  );
};

export default page;
