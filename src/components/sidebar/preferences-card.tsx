import React from "react";
import { Card, CardTitle } from "../ui/card";
import Typography from "../global/typography";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { MdLightMode } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useColorTheme } from "@/providers/color-theme";
type Props = {};

const PreferencesCard = (props: Props) => {
  const { setTheme, theme } = useTheme();
  const { selectColorTheme, colorTheme } = useColorTheme();
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
              className={`w-full ${cn(
                theme === "system" && "border-blue-600"
              )}`}
              variant={"outline"}
            >
              <MdLightMode className="mr-2" size={20} />
              <Typography text="System" variant="p" />
            </Button>
          </div>
          <Separator className="my-5" />
          <div className="flex justify-between items-center w-full my-5" >

          <Typography
            text="Single Color"
            variant="p"
            className="py-2 font-bold"
            />
             <Button
              className=" border-primary-dark border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("primary")}
            >
              Reset{" "}
            </Button>
            </div>
          <div className="flex  flex-wrap gap-5">
            <div className="flex gap-3 w-full">
            <Button
              className="w-full border-green-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("green")}
            >
              Green{" "}
            </Button>
            <Button
              className="w-full border-blue-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("blue")}
            >
              Blue{" "}
            </Button>
            <Button
              className="w-full border-cyan-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("cyan")}
            >
              Cyan{" "}
            </Button>
            </div>
           <div className="flex gap-3 w-full">
           <Button
              className="w-full border-gray-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("gray")}
            >
              Gray{" "}
            </Button>
            <Button
              className="w-full border-indigo-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("indigo")}
            >
              Indigo{" "}
            </Button>
            <Button
              className="w-full border-orange-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("orange")}
            >
              Orange{" "}
            </Button>
           </div>
          <div className="flex gap-3 w-full">
          <Button
              className="w-full border-pink-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("pink")}
            >
              Pink{" "}
            </Button>
            <Button
              className="w-full border-primary-dark border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("primary")}
            >
              Primary{" "}
            </Button>
            <Button
              className="w-full border-purple-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("purple")}
            >
              Purple{" "}
            </Button>
          </div>
        <div className="flex gap-3 w-full">
        <Button
              className="w-full border-red-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("red")}
            >
              Red{" "}
            </Button>
            <Button
              className="w-full border-slate-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("slate")}
            >
              Slate{" "}
            </Button>
            <Button
              className="w-full border-yellow-800 border-2 "
              variant={"outline"}
              onClick={() => selectColorTheme("yellow")}
            >
              Yellow{" "}
            </Button>
        </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PreferencesCard;
