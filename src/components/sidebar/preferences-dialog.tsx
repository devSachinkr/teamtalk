"use client";
import { useColorTheme } from "@/providers/color-theme";
import { useModal } from "@/providers/modal-provider";
import { useTheme } from "next-themes";
import React from "react";
import Typography from "../global/typography";
import Dialog from "../global/Dialog";
import PreferencesCard from "./preferences-card";

type Props = {};
const PreferencesDialog = (props: Props) => {
  const { setTheme, theme } = useTheme();
  const { selectColorTheme } = useColorTheme();
  const { setOpen } = useModal();
  const clickHandler = () => {
    setOpen(<Dialog dialogContent={<PreferencesCard />} />);
  };
  return (
    <div>
      <Typography
        text="Preferences"
        variant="p"
        onClick={clickHandler}
        className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer "
      />
    </div>
  );
};

export default PreferencesDialog;
