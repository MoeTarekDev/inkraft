"use client";
import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotificationLinkAndCount({
  isBottomBarActivated,
  unreadNotificationsCount,
}: {
  isBottomBarActivated: boolean;
  unreadNotificationsCount: number;
}) {
  const pathName = usePathname();
  if (!isBottomBarActivated) {
    return (
      <li className=" hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer">
        <Link
          title="Notifications"
          className="flex p-2 lg:p-3 justify-center lg:justify-start items-center gap-0 lg:gap-4"
          href="/notifications"
        >
          <div className="relative">
            <Bell className="lg:w-5 lg:h-5 w-6 h-6" />
            {unreadNotificationsCount !== 0 && (
              <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 p-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-sm  flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </div>
          <span className="hidden lg:inline-block">Notifications</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="p-2 lg:p-3 hover:bg-accent text-accent-foreground rounded-full w-fit lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer">
      <Link title="Notifications" href="/notifications">
        <div className="relative">
          <Bell
            className={`${
              pathName === "/notifications" && "fill-primary"
            } lg:w-5 lg:h-5 w-6 h-6`}
          />
          {unreadNotificationsCount !== 0 && (
            <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 p-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-sm  flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}
