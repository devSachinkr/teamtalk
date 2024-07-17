import { Channel, USER } from "@/types/app";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Typography from "../global/typography";

type Props = {
  id: string;
  content: string;
  user: USER;
  timestamp: string;
  fileUrl?: string;
  deleted: boolean;
  currentUser: USER;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  channelData: Channel;
};

const ChatMessagesItem = ({
  channelData,
  content,
  currentUser,
  deleted,
  id,
  isUpdated,
  socketQuery,
  socketUrl,
  timestamp,
  user,
  fileUrl,
}: Props) => {
  return (
    <div className="relative group flex items-center hover:bg-black/5 px-1 py-2 rounded transition w-full">
        <div className="flex gap-x-2" >
            <div className="cursor-pointer hover:drop-shadow-md transition ">
                <Avatar>
                     <AvatarImage src={user.avatar_url} alt={user.name ??" "} className="object-cover w-full h-full "/>
                     <AvatarFallback className="bg-neutral-700">
                        <Typography text={user.name?.slice(0,2) ?? "UN"}/>
                     </AvatarFallback>
                </Avatar>

            </div>
        </div>
    </div>
  );
};

export default ChatMessagesItem;
