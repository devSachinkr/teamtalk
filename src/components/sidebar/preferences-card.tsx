import React from "react";
import { Card, CardTitle } from "../ui/card";
import Typography from "../global/typography";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { MdLightMode } from "react-icons/md";
import { BsLaptop} from "react-icons/bs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
type Props = {};

const PreferencesCard = (props: Props) => {
  const { setTheme, theme } = useTheme();
  return (
    <Card className="border-none">
      <CardTitle>
        <Typography text="Preferences" variant="h3" className="py-5" />
      </CardTitle>
      <Tabs orientation="horizontal" defaultValue="themes">
        <TabsList>
          <TabsTrigger value="themes">
            <HiOutlinePaintBrush className="mr-2" />
            <Typography text="Themes" variant="p" />
          </TabsTrigger>
        </TabsList>
        <TabsContent className="max-w-xs md:max-w-fit" value="themes">
          <Typography
            text={"Color Themes"}
            variant="p"
            className="py-2 font-bold"
          />

          <Typography
            text={
              "Choose if TeamTalk should use dark or light theme or use system theme"
            }
            variant="p"
            className="pb-4 text-muted-foreground"
          />
          <div className="flex flex-wrap gap-3 ">
            <Button
              onClick={() => setTheme("light")}
              className={`w-full ${cn(theme === "light" && "border-blue-600")}`}
              variant={"outline"}
            >
              <MdLightMode className="mr-2" size={20} />
              <Typography text="Light" variant="p" />
            </Button>
            <Button
              onClick={() => setTheme("dark")}
              className={`w-full ${cn(theme === "dark" && "border-blue-600")}`}
              variant={"outline"}
            >
              <BsLaptop className="mr-2" size={20} />
              <Typography text="Dark" variant="p" />
            </Button>
            <Button
              onClick={() => setTheme("system")}
              className={`w-full ${cn(theme === "system" && "border-blue-600")}`}
              variant={"outline"}
            >
              <MdLightMode className="mr-2" size={20} />
              <Typography text="System" variant="p" />
            </Button>
          </div>
          <Separator className="my-5"/>
          <Typography text="Single Color" variant="p" className="py-2 font-bold"/>
          <div className="flex  flex-wrap gap-5">
            
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PreferencesCard;
