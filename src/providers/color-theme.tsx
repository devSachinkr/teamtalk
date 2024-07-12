"use client";
import { colors } from "@/types/color";
import { createContext, FC, useContext, useEffect, useState } from "react";
type ColorThemeProvider = {
  children: React.ReactNode;
};
type ColorThemeContext = {
  colorTheme: colors;
  selectColorTheme: (colorTheme: colors) => void;
};

const ColorThemeContext = createContext<ColorThemeContext | undefined>(
  undefined
);

export const ColorThemeProvider: FC<ColorThemeProvider> = ({ children }) => {
  const [color, setColor] = useState<colors>(() => {
    const color =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("selectedColor")
        : null;
    if (color) {
      return color as colors;
    } else {
      return "slate";
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
