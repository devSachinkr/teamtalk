"use client";
import { Workplaces } from "@/types/app";
import React from "react";
import ToolTip from "../global/ToolTip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Typography from "../global/typography";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Home, MessageCircle, PlusCircle } from "lucide-react";
import { useModal } from "@/providers/modal-provider";
import Dialog from "../global/Dialog";
import WorkplaceForm from "../forms/workplace/create-workplace";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  userWorkplacesData: Workplaces[];
  currentWorkplaceData: Workplaces;
};
const SidebarNav = ({ currentWorkplaceData, userWorkplacesData }: Props) => {
  const { setOpen } = useModal();
  const {workplaceId}=useParams();
  const clickHandler = () => {
    setOpen(<Dialog dialogContent={<WorkplaceForm />} />);
  };
  return (
    <nav>
      <ul className="flex flex-col  space-y-4">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 rounded-lg overflow-hidden">
            <ToolTip
              content={
                <Card className="w-[350px] border-0">
                  <p className="text-muted-foreground text-sm mb-3">
                    Workplaces
                  </p>
                  <CardContent className="flex p-0 flex-col">
                    {userWorkplacesData?.map((w) => (
                      <Link
                        key={w.id}
                        className={` hover:opacity-70 px-2 py-1 flex items-center gap-2 ${w.id===workplaceId?"bg-accent rounded-md ":''}`}
                        href={`/workplace/${w?.id}`}
                      >
                        <Avatar>
                          <AvatarImage src={w?.image ?? ""} alt={w?.name} />
                          <AvatarFallback>
                            {w.name ?? "Workplace avatar"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Typography
                            text={w?.name}
                            variant="p"
                            className="text-white"
                          />
                          <Typography
                            text={w?.invite_code ?? ""}
                            variant="p"
                            className="text-muted-foreground"
                          />
                        </div>
                      </Link>
                    ))}
                    <Separator />
                    <div className="flex items-center gap-2 p-2 ">
                      <Button
                        variant={"secondary"}
                        className="flex items-center gap-2"
                        onClick={clickHandler}
                      >
                        <PlusCircle />
                        <Typography variant="p" text="Add workplace" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              }
              value={currentWorkplaceData.id}
            >
              <Avatar>
                <AvatarImage
                  src={currentWorkplaceData.image ?? ""}
                  alt={currentWorkplaceData.name ?? "Workplace avatar"}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="bg-neutral-700">
                  <Typography text={currentWorkplaceData.name} variant="p" />
                </AvatarFallback>
              </Avatar>
            </ToolTip>
          </div>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
              <Home
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography variant="p" text="Home" />
          </div>
        </li>
        <li>
          <div className="flex flex-col cursor-pointer items-center group">
            <div className="flex flex-col items-center cursor-pointer group text-white">
              <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
                <MessageCircle
                  size={20}
                  className="group-hover:scale-125 transition-all duration-300"
                />
              </div>
              <Typography variant="p" text="Dms" />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
