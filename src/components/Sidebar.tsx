import Link from "next/link";

import { Bell, Bookmark, House, Pencil, User } from "lucide-react";
import CreatePost from "./CreatePost";
import Find from "./Find";
import SidebarUserDetails from "./SidebarUserDetails";
import ThemeChanger from "./ThemeChanger";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
export default async function Sidebar() {
  const navLinks = [
    {
      linkIcon: <Bell className="lg:w-5 lg:h-5 w-6 h-6" />,
      linkName: "Notifications",
      linkRef: "/notifications",
    },
    // {
    //   linkIcon: <Mail className="lg:w-5 lg:h-5 w-6 h-6" />,
    //   linkName: "Messages",
    //   linkRef: "/messages",
    // },
    {
      linkIcon: <Bookmark className="lg:w-5 lg:h-5 w-6 h-6" />,
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
      linkIcon: <User className="lg:w-5 lg:h-5 w-6 h-6" />,
      linkName: "Profile",
      linkRef: "/profile",
    },
  ];
  return (
    <>
      <nav className="bg-background hidden sm:flex sticky top-0 bottom-0 p-2 py-4 lg:p-5 h-screen border-r w-[100px] lg:w-[250px]  flex-col gap-1 lg:justify-start items-center lg:items-start">
        <h1 className="bg-primary text-center rounded-md w-10 h-10 lg:ms-1 hover:bg-primary/90 ">
          <Link
            className="text-primary-foreground w-full inline-block p-2 font-bold"
            href="/"
          >
            IK
          </Link>
        </h1>
        <ul className="py-2 pb-0 lg:py-0 mt-0 lg:mt-3  flex flex-col items-center lg:items-start  gap-3 lg:gap-0 w-full">
          <li className="p-2 lg:p-3 hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer">
            <Link
              className="flex lg:p-0 justify-center lg:justify-start items-center gap-0 lg:gap-4"
              href="/"
              title="Home"
            >
              <House className="lg:w-5 lg:h-5 w-6 h-6" />
              <span className="hidden lg:inline-block">Home</span>
            </Link>
          </li>
          <Find />
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="p-2 lg:p-3 hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer"
            >
              <Link
                title={link.linkName}
                className="flex lg:p-0 justify-center lg:justify-start items-center gap-0 lg:gap-4"
                href={link.linkRef}
              >
                {link.linkIcon}
                <span className="hidden lg:inline-block">{link.linkName}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center lg:justify-between  w-full p-3 py-0">
          <span className="hidden lg:inline-block">Theme</span>
          <ThemeChanger />
        </div>
        <Dialog>
          <DialogTrigger asChild className="w-fit lg:w-full">
            <Button
              title="Post"
              className="w-fit press-effect p-2 lg:w-full lg:mt-2 flex items-center justify-center rounded-full lg:rounded-md "
            >
              <span className="hidden lg:inline-block ">Post</span>
              <Pencil className="w-5 h-5 lg:hidden" />
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto sm:h-[80%] z-[99999]">
            <DialogHeader>
              <DialogTitle className="hidden">Create Post</DialogTitle>
              <DialogDescription className="hidden">
                Create a post to reflect your ideas.
              </DialogDescription>
            </DialogHeader>
            <CreatePost />
          </DialogContent>
        </Dialog>

        <SidebarUserDetails />
        {/* <SidebarUserDetails>
          <Avatar className="w-9 h-9 lg:w-10 lg:h-10 ">
            <AvatarImage src={user?.imageUrl} alt="user image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SidebarUserDetails> */}
      </nav>
    </>
  );
}
