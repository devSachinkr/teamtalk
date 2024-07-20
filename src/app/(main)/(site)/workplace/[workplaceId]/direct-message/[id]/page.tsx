import { getChannels } from "@/actions/get-channels";
import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplace } from "@/actions/get-user-workspace";
import { getCurrentWorkplace } from "@/actions/get-workspace";
import ChatGroup from "@/components/channel/chat-group";
import { Workplaces } from "@/types/app";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
    workplaceId: string;
  };
};

const page = async ({ params: { id, workplaceId } }: Props) => {
  const user = await getUserData();
  if (!user?.data) {
    redirect("/sign-in");
  }
  // @ts-ignore
  const { data }: { data: Workplaces[] } = await getUserWorkplace(
    user.data?.workplaces!
  );
  const currentWorkplace = await getCurrentWorkplace(workplaceId!);
  const channels = await getChannels(workplaceId);
  const currentChannel = channels?.find((channel) => channel.id === id);
  return (
    <div className="hidden md:block">
      <ChatGroup
        user={user?.data}
        type="DirectMessage"
        channelId={currentChannel?.id!}
        userWorkPlaceData={data}
        workplace={currentWorkplace?.data!}
        slug={workplaceId}
        chatId={id}
        socketUrl="/api/web-socket/direct-messages"
        socketQuery={{
          channelId: currentChannel?.id!,
          workplaceId: workplaceId!,
          recipientId: id,
        }}
        apiUrl="/api/direct-messages"
        paramKey="recipientId"
        paramValue={id}
        workplaceId={workplaceId}
      />
    </div>
  );
};

export default page;
