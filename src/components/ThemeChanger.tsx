// "use client";
// import { Simple } from "@theme-toggles/react";
// import "@theme-toggles/react/css/Simple.css";

// import { useEffect, useState } from "react";

// export default function ThemeChanger() {
//   const [isItDark, setIsItDark] = useState<boolean | null>(null);

//   useEffect(() => {
//     // Ensure the code runs only on the client side
//     const storedTheme = localStorage.getItem("isItDark");
//     setIsItDark(
//       storedTheme !== null
//         ? JSON.parse(storedTheme)
//         : window.matchMedia("(prefers-color-scheme: dark)").matches
//     );
//   }, []);

//   useEffect(() => {
//     if (isItDark !== null) {
//       if (isItDark) {
//         document.documentElement.classList.add("dark");
//         document.documentElement.classList.remove("light");
//         document.documentElement.style.setProperty("color-scheme", "dark");
//       } else {
//         document.documentElement.classList.add("light");
//         document.documentElement.classList.remove("dark");
//         document.documentElement.style.setProperty("color-scheme", "light");
//       }
//       localStorage.setItem("isItDark", JSON.stringify(isItDark));
//     }
//   }, [isItDark]);

//   function handleTheme() {
//     setIsItDark((prev) => !prev);
//   }

//   if (isItDark === null) {
//     return null; // Optionally, show a loading spinner here
//   }

//   return (
//     //@ts-expect-error www
//     <Simple
//       onToggle={handleTheme}
//       toggled={isItDark}
//       className="p-2 hover:bg-accent rounded-full text-xl"
//     />
//   );
// }
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeChanger() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[9999]">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
