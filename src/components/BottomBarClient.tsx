"use client";
import { useUser } from "@clerk/nextjs";
import { Bell, Bookmark, House, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CreatePost from "./CreatePost";
export default function BottomBarClient({ children }: any) {
  const user = useUser();
  const pathName = usePathname();
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const [previousScrollPos, setPreviousScrollPos] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > previousScrollPos) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
    setPreviousScrollPos(currentScrollPos);
  }, [previousScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  const navLinks = [
    {
      linkName: "Notifications",
      linkRef: "/notifications",
      linkIcon: (
        <Bell
          className={`lg:w-5 lg:h-5 w-6 h-6 ${
            pathName === "/notifications" ? "fill-primary" : ""
          }`}
        />
      ),
    },
    // {
    //   linkIcon: <Mail className="lg:w-5 lg:h-5 w-6 h-6" />,
    //   linkName: "Messages",
    //   linkRef: "/messages",
    // },
    {
      linkIcon: (
        <Bookmark
          className={`lg:w-5 lg:h-5 w-6 h-6 ${
            pathName === "/bookmarks" ? "fill-primary" : ""
          }`}
        />
      ),
      linkName: "Bookmarks",
      linkRef: "/bookmarks",
    },
    // {
    //   linkIcon: <Captions className="lg:w-5 lg:h-5 w-6 h-6" />,
    //   linkName: "Captions",
    //   linkRef: "/captions",
    // },
    // {
    //   linkIcon: <Quote className="lg:w-5 lg:h-5 w-6 h-6" />,
    //   linkName: "Quotes",
    //   linkRef: "/quotes",
    // },

    {
      linkIcon: (
        <User
          className={`lg:w-5 lg:h-5 w-6 h-6 ${
            pathName.includes("/profile") ? "fill-primary" : ""
          }`}
        />
      ),
      linkName: "Profile",
      linkRef: `/profile/${user?.user?.id}`,
    },
  ];

  return (
    <>
      <nav
        className={`fixed bottom-0 left-0 right-0 z-[999] flex sm:hidden p-2 bg-card transition-opacity duration-300 ${
          isBlurred ? "opacity-50" : "opacity-100"
        }`}
      >
        <ul className="flex items-center justify-between w-full">
          <li className="p-2 lg:p-3 hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer">
            <Link href="/" title="Home">
              <House
                className={`w-6 h-6 ${pathName === "/" ? "fill-primary" : ""}`}
              />
            </Link>
          </li>
          {children}
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="p-2 lg:p-3 hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer"
            >
              <Link title={link.linkName} href={link.linkRef}>
                {link.linkIcon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <CreatePost isBlurred={isBlurred} showSmallModal={true} />
    </>
  );
}
