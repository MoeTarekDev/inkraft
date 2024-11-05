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
            <svg
              width="45"
              height="30"
              viewBox="0 0 45 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6.68C7.82667 6.68 6.90667 6.44 6.24 5.96C5.6 5.48 5.34667 4.70667 5.48 3.64C5.61333 2.41333 6.02667 1.53333 6.72 0.999998C7.41333 0.439999 8.38667 0.159999 9.64 0.159999C10.84 0.159999 11.76 0.413333 12.4 0.919999C13.0667 1.42667 13.3333 2.17333 13.2 3.16C13.0667 4.46667 12.64 5.38667 11.92 5.92C11.2267 6.42667 10.2533 6.68 9 6.68ZM11.48 9L6.84 29H0.04L4.68 9H11.48ZM37.6034 9L26.1234 19L25.3234 19.36L18.0834 25.68L18.6834 19.24L29.7234 9H37.6034ZM24.9234 0.52L18.3234 29H11.5234L18.1234 0.52H24.9234ZM27.8034 15L33.7634 29H27.0834L23.0434 18.88L27.8034 15ZM40.2491 29.32C39.1291 29.32 38.2224 29.0667 37.5291 28.56C36.8624 28.0267 36.5291 27.2667 36.5291 26.28C36.5291 25.0267 36.9024 24.0267 37.6491 23.28C38.3957 22.5067 39.4091 22.12 40.6891 22.12C41.8091 22.12 42.7024 22.3867 43.3691 22.92C44.0624 23.4533 44.4091 24.2133 44.4091 25.2C44.4091 26.4533 44.0357 27.4533 43.2891 28.2C42.5691 28.9467 41.5557 29.32 40.2491 29.32Z"
                className="fill-primary"
              />
            </svg>
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
