"use client";

import Link from "next/link";
import ThemeChanger from "./ThemeChanger";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopBarSheet from "./TopBarSheet";

export default function TopBar({
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
  const pathName = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div
      className={` ${
        pathName.includes("bookmarks") ||
        pathName.includes("followers") ||
        pathName.includes("following")
          ? "hidden"
          : "flex"
      } fixed top-0 left-0 right-0 bg-card/30 backdrop-blur-md transition-transform duration-500 z-[999] py-5 px-3  ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } items-center justify-between sm:hidden border-b`}
    >
      <TopBarSheet
        firstName={firstName}
        lastName={lastName}
        userName={userName}
        userId={userId}
        myFollowers={myFollowers}
        followedUsers={followedUsers}
        userImage={userImage}
      />
      <h1 className="bg-primary text-center rounded-md w-10 h-10 lg:ms-1 hover:bg-primary/90 ">
        <Link
          className="text-primary-foreground w-full inline-block p-2 font-bold"
          href="/"
        >
          IK
        </Link>
      </h1>
      <ThemeChanger />
    </div>
  );
}
