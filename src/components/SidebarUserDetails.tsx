"use client";
import { UserButton } from "@clerk/nextjs";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

export default function SidebarUserDetails({
  firstName,
  lastName,
  userName,
}: {
  firstName: string;
  lastName: string;
  userName: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="self-center relative lg:self-start flex items-center lg:w-full justify-between hover:bg-accent/40 hover:text-foreground rounded-full lg:rounded-md cursor-pointer lg:p-1 text-accent-foreground mt-auto">
        <div className="w-full lg:h-[60px]">
          <span className="bg-muted rounded-full w-7 h-7 animate-pulse"></span>
        </div>

        <div className="hidden text-sm lg:flex items-center gap-2 absolute right-[15px] z-[-1]">
          <div className="flex flex-col gap-2">
            <span className="w-[70px] h-[10px] bg-muted animate-pulse rounded-lg"></span>
            <span className="w-[50px] h-[10px] bg-muted animate-pulse rounded-lg"></span>
          </div>
          <div className="hidden lg:block">
            <Ellipsis />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="self-center relative lg:self-start flex items-center lg:w-full justify-between hover:bg-accent/40 hover:text-foreground rounded-full lg:rounded-md cursor-pointer lg:p-1 text-accent-foreground mt-auto">
      <div className="w-full lg:h-[60px]">
        <UserButton />
      </div>

      <div className="hidden text-xs ms-[28px] lg:flex items-center gap-2 left-[18px]  absolute z-[-1]">
        <div className="flex flex-col">
          <span className="line-clamp-1">
            {firstName} {lastName}
          </span>
          <span className="text-muted-foreground line-clamp-1">
            @{userName}
          </span>
        </div>
        <div className="hidden lg:block">
          <Ellipsis />
        </div>
      </div>
    </div>
  );
}
