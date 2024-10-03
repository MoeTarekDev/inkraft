"use client";
import { DarkSide } from "@theme-toggles/react";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    //@ts-expect-error www
    <DarkSide
      className="p-3 hover:bg-accent lg:bg-none rounded-full"
      onToggle={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
}
