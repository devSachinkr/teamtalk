import React from "react";
import Sidebar from "../sidebar";
import SidebarInfo from "../sidebar/sidebar-info";
import ChannelHeader from "./channel-header";
import Typography from "../global/typography";
import TextEditor from "../global/text-editor";
import { USER, Workplaces } from "@/types/app";
import ChatMessages from "./chat-messages";
import SearchBar from "./search-bar";
type Props = {
  workplace: Workplaces;
  channelId: string;
  workplaceId: string;
  user: USER;
  userWorkPlaceData: Workplaces[];
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  slug: string;
  socketQuery: Record<string, string>;
  type: "Channels" | "DirectMessage";
};
const ChatGroup = ({
  channelId,
  workplace,
  workplaceId,
  user,
  userWorkPlaceData,
  apiUrl,
  chatId,
  paramKey,
  paramValue,
  socketUrl,
  slug,
  socketQuery,
  type,
}: Props) => {
  return (
    <>
      {" "}
      <div className="h-[calc(100vh-256px)] overflow-y-auto  [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkPlace={workplace!}
          user={user!}
          userWorkPlaceData={userWorkPlaceData!}
        />
        <SidebarInfo />
        <SearchBar
          currentWorkPlace={workplace}
          channelId={channelId}
          loggedInUser={user.id}
        />
        <div className="p-4 relative overflow-hidden">
          <ChannelHeader />
          <div className="mt-14">
            <ChatMessages
              apiUrl={apiUrl}
              channelId={channelId}
              chatId={chatId}
              workplace={workplace}
              type={type}
              socketQuery={socketQuery}
              paramKey={paramKey}
              paramValue={paramValue}
              user={user}
              socketUrl={socketUrl}
              workplaceId={workplaceId}
            />
          </div>
        </div>
      </div>
      <div className="m-4">
        <TextEditor
          apiUrl={socketUrl}
          type="Channels"
          channelId={channelId}
          workplaceId={workplaceId}
          workplace={workplace}
          user={user!}
          recipientId={type === "DirectMessage" ? chatId : undefined}
        />
      </div>
    </>
  );
};

export default ChatGroup;
