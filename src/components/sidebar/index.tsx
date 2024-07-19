"use client";
import { USER, Workplaces } from "@/types/app";
import React from "react";
import SidebarNav from "./sidebar-nav";
import { PlusCircleIcon } from "lucide-react";
import ToolTip from "../global/ToolTip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useColorTheme } from "@/providers/color-theme";
import { GoDot, GoDotFill } from "react-icons/go";
import { GiNightSleep } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Typography from "../global/typography";
import { FaPencil, FaRegCalendarCheck } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { Separator } from "../ui/separator";
import PreferencesDialog from "./preferences-dialog";
type Props = {
  userWorkPlaceData: Workplaces[];
  currentWorkPlace: Workplaces;
  user: USER;
};

const Sidebar = ({ userWorkPlaceData, currentWorkPlace, user }: Props) => {
  const { colorTheme } = useColorTheme();
  let bg_color = "bg-primary-dark";
  if (!user) return;
  switch (colorTheme) {
    case "blue":
      bg_color = "bg-blue-700";
      break;
    case "green":
      bg_color = "bg-green-700";
      break;
    case "red":
      bg_color = "bg-red-700";
      break;
    case "yellow":
      bg_color = "bg-yellow-700";
      break;
    case "indigo":
      bg_color = "bg-indigo-700";
      break;
    case "purple":
      bg_color = "bg-purple-700";
      break;
    case "pink":
      bg_color = "bg-pink-700";
      break;
    case "orange":
      bg_color = "bg-orange-700";
      break;
    case "cyan":
      bg_color = "bg-cyan-700";
      break;
    case "gray":
      bg_color = "bg-gray-700";
      break;
    case "slate":
      bg_color = "bg-slate-700";
      break;
    case "primary":
      bg_color = "bg-primary-dark";
      break;
    default:
      bg_color = "bg-background";
      break;
  }
  return (
    <aside
      className={`fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20`}
    >
      <SidebarNav
        userWorkplacesData={userWorkPlaceData}
        currentWorkplaceData={currentWorkPlace}
      />
      <div className="flex flex-col space-y-3">
        <div
          className={`bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300
        hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10
          `}
        >
          <PlusCircleIcon />
        </div>
        <ToolTip
          contentClasses="text-white bg-black border-black"
          content={
            <Typography variant="p" text={user.name ?? user.email ?? ""} />
          }
          side="right"
        >
          <div>
            <Popover>
              <PopoverTrigger>
                <div className="h-10 w-10 relative cursor-pointer">
                  <div className="h-full w-full rounded-lg overflow-hidden">
                    <Image
                      className="object-cover w-full h-full"
                      src={user.avatar_url}
                      alt="user avatar"
                      width={300}
                      height={300}
                    />
                    <div
                      className={cn(
                        "absolute z-10 rounded-full -right-[20%] -bottom-1",
                        bg_color
                      )}
                    >
                      {user.is_away ? (
                        <GoDot className="text-white text-xl" />
                      ) : (
                        <GoDotFill size={17} className="text-green-700" />
                      )}
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent side="right">
                <div>
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={user.avatar_url}
                        alt={user.name ?? "user name"}
                      />
                      <AvatarFallback>{user.name ?? "User"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Typography text={user.name ?? user.email} variant="p" />
                      <div className="flex items-center space-x-1">
                        {user.is_away ? (
                          <GiNightSleep size={12} />
                        ) : (
                          <GoDotFill size={17} className="text-green-600" />
                        )}
                        <span className="text-xs">
                          {user.is_away ? "Away" : "Active"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border group cursor-pointer mt-4 mb-2 p-1 rounded flex items-center space-x-2">
                    <FaRegCalendarCheck className="group-hover:hidden" />
                    <FaPencil className=" hidden group-hover:block" />
                    <Typography
                      text="In a metting"
                      variant="p"
                      className="text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Typography
                      text={
                        user.is_away ? "set status away" : "set status active"
                      }
                      variant="p"
                      className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                    />
                    <Typography
                      text={"Clear status"}
                      variant="p"
                      className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                    />
                    <Separator />
                    <Typography
                      text={"Profile"}
                      variant="p"
                      className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                    />
                    <PreferencesDialog />
                    <Separator />
                    <div className="gap-2 items-center flex hover:text-white hover:bg-blue-700 px-2 py-1 rounded  cursor-pointer">
                      <IoDiamondOutline className="text-orange-400" />
                      <Typography
                        variant="p"
                        text={`Upgrade ${currentWorkPlace.name}`}
                        className="text-xs"
                      />
                    </div>
                    <Typography
                      variant="p"
                      text={`Sign out of ${currentWorkPlace.name}`}
                      className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer "
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </ToolTip>
      </div>
    </aside>
  );
};

export default Sidebar;
