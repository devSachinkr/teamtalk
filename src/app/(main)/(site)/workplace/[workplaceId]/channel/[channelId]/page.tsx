import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplace } from "@/actions/get-user-workspace";
import { getCurrentWorkplace } from "@/actions/get-workspace";
import ChannelHeader from "@/components/channel/channel-header";
import ChatGroup from "@/components/channel/chat-group";
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
      <ChatGroup
        workplaceId={workplaceId}
        workplace={workplace.data!}
        channelId={channelId}
        user={userData.data!}
        userWorkPlaceData={data!}
        chatId={channelId}
        slug={workplaceId}
        socketUrl="/api/web-socket/messages"
        socketQuery={{ channelId: channelId, workplaceId: workplaceId }}
        apiUrl="/api/messages"
        paramKey="channelId"
        paramValue={channelId}
        type="Channels"
      />
    </div>
  );
};

export default page;
