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
      <h1 className="bg-primary text-center rounded-md w-10 h-10 lg:ms-1 hover:bg-primary/90 flex justify-center items-center">
        <Link
          className="text-primary-foreground text-center w-full inline-block p-2 font-bold"
          href="/"
        >
          <svg
            width="23"
            height="16"
            viewBox="0 0 23 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 3.84C3.91333 3.84 3.45333 3.72 3.12 3.48C2.8 3.24 2.67333 2.85333 2.74 2.32C2.80667 1.70667 3.01333 1.26667 3.36 0.999999C3.70667 0.719999 4.19333 0.58 4.82 0.58C5.42 0.58 5.88 0.706666 6.2 0.96C6.53333 1.21333 6.66667 1.58667 6.6 2.08C6.53333 2.73333 6.32 3.19333 5.96 3.46C5.61333 3.71333 5.12667 3.84 4.5 3.84ZM5.74 5L3.42 15H0.02L2.34 5H5.74ZM18.8017 5L13.0617 10L12.6617 10.18L9.04172 13.34L9.34172 10.12L14.8617 5H18.8017ZM12.4617 0.76L9.16172 15H5.76172L9.06172 0.76H12.4617ZM13.9017 8L16.8817 15H13.5417L11.5217 9.94L13.9017 8ZM20.1245 15.16C19.5645 15.16 19.1112 15.0333 18.7645 14.78C18.4312 14.5133 18.2645 14.1333 18.2645 13.64C18.2645 13.0133 18.4512 12.5133 18.8245 12.14C19.1979 11.7533 19.7045 11.56 20.3445 11.56C20.9045 11.56 21.3512 11.6933 21.6845 11.96C22.0312 12.2267 22.2045 12.6067 22.2045 13.1C22.2045 13.7267 22.0179 14.2267 21.6445 14.6C21.2845 14.9733 20.7779 15.16 20.1245 15.16Z"
              className="fill-primary-foreground"
            />
          </svg>
        </Link>
      </h1>
      <ThemeChanger />
    </div>
  );
}
