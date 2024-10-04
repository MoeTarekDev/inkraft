"use client";
import { Simple } from "@theme-toggles/react";
import "@theme-toggles/react/css/Simple.css";

import { useEffect, useState } from "react";

export default function ThemeChanger() {
  const [isItDark, setIsItDark] = useState(() => {
    const storedTheme = localStorage.getItem("isItDark");
    return storedTheme !== null
      ? JSON.parse(storedTheme)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    if (isItDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.style.setProperty("color-scheme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty("color-scheme", "light");
    }
  }, [isItDark]);

  function handleTheme() {
    setIsItDark((prev: boolean) => !prev);
    localStorage.setItem("isItDark", JSON.stringify(!isItDark));
  }
  return (
    //@ts-expect-error www
    <Simple
      onToggle={handleTheme}
      toggled={isItDark}
      className="p-2 hover:bg-accent rounded-full text-xl"
    />
  );
}
