"use client";
import { useVideoChat } from "@/hooks/video-chat";
import { USER } from "@/types/app";
import '@livekit/components-styles'
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import { Spinner } from "../global/spinner";
type Props = {
  chatId: string;
  userData: USER;
};

const VideoChat = ({ chatId, userData }: Props) => {
  const { token } = useVideoChat({ chatId, user: userData });
  if (token === "") {
    return <Spinner />;
  }
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

export default VideoChat;
