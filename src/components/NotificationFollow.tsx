"use client";
import { User } from "lucide-react";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import { Notification } from "@/lib/types";
import { getRelativeTime } from "@/lib/features";
import Link from "next/link";
import { readNotification } from "@/lib/actions";

export default function NotificationFollow({
  notification,
  userId,
  loggedInUserFollowedUsers,
}: {
  notification: Notification;
  userId: string;
  loggedInUserFollowedUsers: any;
}) {
  return (
    <>
      {!notification.read ? (
        <div className="relative flex gap-3 items-center hover:bg-muted/20 p-5 cursor-pointer caption-card-notification border-b">
          <Link
            onClick={async () => {
              await readNotification(userId, notification.id);
            }}
            className="absolute inset-0"
            href={`/profile/${notification.users.clerkUserId}`}
          ></Link>
          <div>
            <User className="fill-primary" />
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="w-full flex items-center gap-3">
              <UserAvatarWithHover
                userId={userId}
                user={notification.users}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <div className="flex flex-col gap-1 z-20">
                <div className="flex items-center gap-1 text-sm flex-wrap">
                  <UserNameWithHover
                    userId={userId}
                    user={notification.users}
                    loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                  />
                  <span className="text-muted-foreground">followed you</span>
                </div>
                <span className="text-xs text-muted-foreground w-fit">
                  {getRelativeTime(notification.created_at)}
                </span>
              </div>
            </div>
            <span className="unread"></span>
          </div>
        </div>
      ) : (
        <div className="relative flex gap-3 items-center hover:bg-muted/20 p-5 cursor-pointer caption-card-notification border-b">
          <Link
            className="absolute inset-0"
            href={`/profile/${notification.users.clerkUserId}`}
          ></Link>
          <div>
            <User className="fill-primary" />
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="w-full flex items-center gap-3">
              <UserAvatarWithHover
                userId={userId}
                user={notification.users}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <div className="flex flex-col gap-1 z-20">
                <div className="flex items-center gap-1 text-sm flex-wrap">
                  <UserNameWithHover
                    userId={userId}
                    user={notification.users}
                    loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                  />
                  <span className="text-muted-foreground">followed you</span>
                </div>
                <span className="text-xs text-muted-foreground w-fit">
                  {getRelativeTime(notification.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
