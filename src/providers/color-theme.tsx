"use client";
import { Channel } from "@/types/app";
import { colors } from "@/types/color";
import { createContext, FC, useContext, useEffect, useState } from "react";
type ColorThemeProvider = {
  children: React.ReactNode;
};
type ColorThemeContext = {
  colorTheme: colors;
  selectColorTheme: (colorTheme: colors) => void;
  setChannels: (channels: Channel[]) => void;
  channels: Channel[] | undefined;
  color:string;
};

const ColorThemeContext = createContext<ColorThemeContext | undefined>(
  undefined
);

export const ColorThemeProvider: FC<ColorThemeProvider> = ({ children }) => {
  const [channels, setChannels] = useState<Channel[]|undefined>(undefined);
  const [color, setColor] = useState<colors>(() => {
    const color =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("selectedColor")
        : null;
    if (color) {
      return color as colors;
    } else {
      return "primary";
    }
  });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    localStorage.setItem("selectedColor", color);
    setIsMounted(true);
  }, [color]);
  const selectColor = (color: colors) => {
    setColor(color);
  };
  const value: ColorThemeContext = {
    colorTheme: color,
    selectColorTheme: selectColor,
    setChannels,
    channels,
    color
  };
  if (!isMounted) {
    return null;
  }
  return (
    <ColorThemeContext.Provider value={value}>
      {isMounted && children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
