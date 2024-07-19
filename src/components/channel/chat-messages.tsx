"use client";
import { useFetchMessages } from "@/hooks/channel";
import { USER, Workplaces } from "@/types/app";
import React, { ElementRef, useRef } from "react";
import { Spinner } from "../global/spinner";
import ChatMessagesItem from "./chat-message-item";
import { useColorTheme } from "@/providers/color-theme";
import { format } from "date-fns";
import { useChatScrollRef, useChatSocketConnection } from "@/hooks/chat";
import IntroBanner from "./Intro-banner";
import { Button } from "../ui/button";
type Props = {
  apiUrl: string;
  type: "Channels" | "DirectMessage";
  channelId: string;
  workplaceId: string;
  workplace: Workplaces;
  user: USER;
  paramKey: "channelId" | "recipientId";
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramValue: string;
  chatId: string;
};
const ChatMessages = ({
  apiUrl,
  channelId,
  type,
  user,
  workplace,
  workplaceId,
  chatId,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
}: Props) => {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const { channels } = useColorTheme();
  const channel = channels?.find((c) => c?.id === channelId);
  const queryKey =
    type === "Channels" ? `channel:${chatId}` : `direct_messgae${chatId}`;
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchMessages({
      apiUrl,
      queryKey,
      paramKey,
      pageSize: 10,
      paramValue,
    });
  useChatSocketConnection({
    queryKey,
    updateKey:
      type === "Channels"
        ? `${queryKey}:channel-messages:update`
        : `direct_messages:update`,
    paramValue,
    addKey:
      type === "Channels"
        ? `${queryKey}::channel-message`
        : `direct_messages:post`,
  });

  useChatScrollRef({
    bottomRef,
    chatRef,
    count: data?.pages?.[0].data?.length ?? 0,
  });
  if (status === "pending") {
    return <Spinner />;
  }
  if (status === "error") {
    return <div>Error</div>;
  }
  const DATE_FORMAT = "d MMM yyy, HH:mm";
  const renderMessages = () =>
    data.pages.map((m) =>
      m.data.map((ms) => (
        <ChatMessagesItem
          key={ms.id}
          currentUser={user}
          user={ms.user}
          content={ms.content ?? ""}
          fileUrl={ms.file_url ?? ""}
          deleted={ms.id_deleted}
          channelData={channel}
          id={ms.id}
          timestamp={format(new Date(ms.created_at), DATE_FORMAT)}
          isUpdated={ms.updated_at !== ms.created_at}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
        />
      ))
    );
  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && (
        <IntroBanner
          type={type}
          name={""}
          creationDate={workplace.created_at}
        />
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Spinner />
          ) : (
            <Button onClick={() => fetchNextPage()} variant={"link"}>
              Load previous message
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
