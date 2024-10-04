import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function TopBarSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="w-[36px] h-[36px]">
          <AvatarImage
            className="w-full h-full"
            src="https://github.com/shadcn.png"
            alt="User avatar"
          />
          <AvatarFallback className="w-full h-full">CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="z-[9999] w-[60%] py-5 px-0 flex flex-col gap-5 items-start"
      >
        <SheetHeader>
          <SheetTitle className="hidden">User Info</SheetTitle>
          <SheetDescription className="hidden">
            User Info/Logout
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-5">
          <Avatar className="w-[40px] h-[40px]">
            <Link href="/profile">
              <AvatarImage
                className="w-full h-full"
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
              <AvatarFallback className="w-full h-full">CN</AvatarFallback>
            </Link>
          </Avatar>
          <div className="flex flex-col">
            <Link href="/profile">Mohamed Tarek</Link>
            <Link href="/profile" className="text-muted-foreground">
              @moetarek
            </Link>
          </div>
          <div className="flex items-center gap-2 ">
            <Link
              href="user/followers"
              className="text-sm  hover:underline cursor-pointer"
            >
              <span className="font-semibold">
                1.25k <span className="text-muted-foreground">Followers</span>
              </span>
            </Link>
            <Link
              href="user/following"
              className="text-sm hover:underline cursor-pointer"
            >
              <span className="font-semibold">
                400 <span className="text-muted-foreground">Following</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="sign-out-sheet self-stretch px-5 py-3 hover:bg-accent relative mt-auto">
          <LogOut className="absolute left-[20px] top-1/2 -translate-y-1/2  w-[20px] h-[20px]" />
          <SignOutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
