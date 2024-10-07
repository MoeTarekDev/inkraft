"use client";

import { Bell, Bookmark, House, Pencil, User } from "lucide-react";
import Link from "next/link";
import Find from "./Find";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import CreatePost from "./CreatePost";
import { usePathname } from "next/navigation";

export default function BottomBar() {
  const pathName = usePathname();
  const [isBlurred, setIsBlurred] = useState(false);
  const [previousScrollPos, setPreviousScrollPos] = useState(0);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > previousScrollPos) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
    setPreviousScrollPos(currentScrollPos);
  };
  //@ts-ignore www
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [previousScrollPos]);
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
            pathName === "/profile" ? "fill-primary" : ""
          }`}
        />
      ),
      linkName: "Profile",
      linkRef: "/profile",
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
          <Find />
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
      <Dialog>
        <DialogTrigger
          asChild
          className={`w-fit fixed right-5 bottom-[66px] z-[9999] sm:hidden transition-opacity duration-300 ${
            isBlurred ? "opacity-50" : "opacity-100"
          }`}
        >
          <Button
            title="Post"
            className="w-fit press-effect p-2 flex items-center justify-center rounded-full"
          >
            <Pencil className="w-5 h-5 lg:hidden" />
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto h-[90%] w-full sm:h-[80%] z-[9999]">
          <DialogHeader>
            <DialogTitle className="hidden">Create Post</DialogTitle>
            <DialogDescription className="hidden">
              Create a post to reflect your ideas.
            </DialogDescription>
          </DialogHeader>
          <CreatePost />
        </DialogContent>
      </Dialog>
    </>
  );
}
