"use client";

import { useSearch } from "@/hooks/serach";
import { cn } from "@/lib/utils";
import { USER, Workplaces } from "@/types/app";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Search } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineAssistantPhoto,
} from "react-icons/md";
import { Button } from "../ui/button";

type Props = {
  currentWorkPlace: Workplaces;
  channelId: string;
  loggedInUser: string;
};

const SearchBar = ({ channelId, currentWorkPlace, loggedInUser }: Props) => {
  const {
    bg_color,
    channel,
    isChannelMember,
    isChannelOwner,
    isRegulator,
    makeUserRegulator,
    addUserToChannel,
  } = useSearch({
    channelId,
    currentWorkPlace,
    loggedInUser,
  });
  return (
    <div
      className={cn("absolute h-10 w-[500px] px-3 top-2 rounded-md", bg_color)}
    >
      <Popover>
        <PopoverTrigger className="flex items-center space-x-2 w-full h-full ">
          <Search className="text-black dark:text-white" size={20} />
          <span className="text-sm ">Search #{channel?.name ?? "channel"}</span>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] ">
          <ScrollArea className="rounded-md max-h-96">
            {currentWorkPlace?.members?.map((m) => (
              <div
                className="flex items-center my-2 justify-between"
                key={m.id}
              >
                <div className="flex items-center p-2">
                  <span className="mr-2 text-sm text-black dark:text-white">
                    {m?.name ?? m?.email ?? ""}
                  </span>
                  {isRegulator(m?.id) && (
                    <MdOutlineAssistantPhoto className="w-5 h-5" />
                  )}
                  {isChannelOwner(m?.id) && (
                    <MdOutlineAdminPanelSettings className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
                <div className="flex gap-x-2">
                  {loggedInUser !== m.id &&
                    !isRegulator(m?.id) &&
                    isChannelMember(m?.id) && !isChannelOwner(m?.id) && (
                      <>
                        <Button
                          className="text-sm "
                          size="sm"
                          variant={"destructive"}
                          onClick={() => makeUserRegulator(m.id, channel?.id!)}
                        >
                          Assign Regulator
                        </Button>
                      </>
                    )}
                  {!isChannelMember(m.id) ? (
                    <Button
                      className="text-sm "
                      size="sm"
                      onClick={() => addUserToChannel(m.id, channel?.id!)}
                    >
                      Add to Channel
                    </Button>
                  ) : (
                    <Button
                      className={cn(
                        `text-white cursor-default hover:${bg_color}`,
                        bg_color
                      )}
                      size="sm"
                    >
                      Member
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
