import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import UserUserNameWithHover from "./UserUserNameWithHover";
interface FollowUserProps {
  showFollowButton: boolean;
}
export default function FollowUser({ showFollowButton }: FollowUserProps) {
  {
    return (
      <Link
        href="/profile"
        className="flex items-center justify-between hover:bg-accent p-3 cursor-pointer"
      >
        <div className="flex items-center gap-1">
          <UserAvatarWithHover />

          <div className="flex items-center justify-between">
            <div className="flex flex-col text-xs ">
              <UserNameWithHover />
              <UserUserNameWithHover />
            </div>
          </div>
        </div>
        <Button
          className={`${
            showFollowButton ? "inline-block" : "hidden"
          } text-sm cursor-pointer py-1 px-4`}
        >
          Follow
        </Button>
      </Link>
    );
  }
}
