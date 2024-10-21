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

export default function TopBarSheet({
  firstName,
  lastName,
  userName,
  userId,
  myFollowers,
  followedUsers,
  userImage,
}: {
  firstName: string;
  lastName: string;
  userName: string;
  userId: string;
  myFollowers: [{ followerId: string }];
  followedUsers: [{ followedId: string }];
  userImage: string;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="w-[36px] h-[36px]">
          <AvatarImage
            className="w-full h-full"
            src={userImage}
            alt="User avatar"
          />
          <AvatarFallback className="w-full h-full">
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
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
            <Link href={`/profile/${userId}`}>
              <AvatarImage
                className="w-full h-full"
                src={userImage}
                alt="User avatar"
              />
              <AvatarFallback className="w-full h-full">
                {firstName[0]}
                {lastName[0]}
              </AvatarFallback>
            </Link>
          </Avatar>
          <div className="flex flex-col">
            <Link href={`/profile/${userId}`}>
              {firstName} {lastName}
            </Link>
            <Link href={`/profile/${userId}`} className="text-muted-foreground">
              @{userName}
            </Link>
          </div>
          <div className="flex items-center gap-2 ">
            <Link
              href="user/followers"
              className="text-sm  hover:underline cursor-pointer"
            >
              <Link
                href={`/profile/${userId}/connections/followers`}
                className="font-semibold"
              >
                {myFollowers.length}{" "}
                <span className="text-muted-foreground">Followers</span>
              </Link>
            </Link>
            <Link
              href="user/following"
              className="text-sm hover:underline cursor-pointer"
            >
              <Link
                href={`/profile/${userId}/connections/following`}
                className="font-semibold"
              >
                {followedUsers.length}{" "}
                <span className="text-muted-foreground">Following</span>
              </Link>
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
