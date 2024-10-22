import Link from "next/link";

import { Bookmark, House, User } from "lucide-react";
import CreatePost from "./CreatePost";
import Find from "./Find";
import NotificationLinkAndCount from "./NotificationLinkAndCount";
import SidebarUserDetails from "./SidebarUserDetails";
import ThemeChanger from "./ThemeChanger";
export default async function Sidebar({
  firstName,
  lastName,
  userName,
  userId,
  userImage,
  unreadNotificationsCount,
}: {
  firstName: string;
  lastName: string;
  userName: string;
  userId: string;
  userImage: string;
  unreadNotificationsCount: number;
}) {
  const navLinks = [
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
      linkRef: `/profile/${userId}`,
    },
  ];
  return (
    <>
      <nav className="bg-background hidden sm:flex sticky top-0 bottom-0 p-2 py-4 lg:p-5 h-screen border-r w-[100px] lg:w-[250px]  flex-col gap-1 lg:justify-start items-center lg:items-start">
        <h1 className=" text-center self-center lg:self-start lg:ms-[12px] text-foreground">
          <Link className="w-full inline-block font-bold text-4xl" href="/">
            ik
            <span className=" ms-[2px] inline-block w-2 h-2 bg-primary rounded-full"></span>
          </Link>
        </h1>
        <ul className="py-2 pb-0 lg:py-0 mt-0 lg:mt-3  flex flex-col items-center lg:items-start  gap-3 lg:gap-0 w-full">
          <li className=" hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer">
            <Link
              className="flex p-2 lg:p-3 justify-center lg:justify-start items-center gap-0 lg:gap-4"
              href="/"
              title="Home"
            >
              <House className="lg:w-5 lg:h-5 w-6 h-6" />
              <span className="hidden lg:inline-block">Home</span>
            </Link>
          </li>
          <Find />
          <NotificationLinkAndCount
            isBottomBarActivated={false}
            unreadNotificationsCount={unreadNotificationsCount}
          />
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer"
            >
              <Link
                title={link.linkName}
                className="flex p-2 lg:p-3  justify-center lg:justify-start items-center gap-0 lg:gap-4"
                href={link.linkRef}
              >
                {link.linkIcon}
                <span className="hidden lg:inline-block">{link.linkName}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center lg:justify-between w-full p-3 py-2">
          <span className="hidden lg:inline-block">Theme</span>
          <ThemeChanger />
        </div>
        <CreatePost showSmallModal={false} userImage={userImage} />

        <SidebarUserDetails
          firstName={firstName}
          lastName={lastName}
          userName={userName}
        />
      </nav>
    </>
  );
}
