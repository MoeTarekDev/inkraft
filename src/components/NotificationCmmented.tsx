"use client";
import { MessageCircle } from "lucide-react";
import CaptionCardMini from "./CaptionCardMini";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import Link from "next/link";
import { Notification } from "@/lib/types";
import { getRelativeTime } from "@/lib/features";
import { readNotification } from "@/lib/actions";

export default function NotificationCmmented({
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
        <div className="relative flex flex-col gap-5 items-center hover:bg-muted/20 p-5 cursor-pointer caption-card-notification border-b">
          <Link
            onClick={async () => {
              await readNotification(userId, notification.id);
            }}
            className="absolute inset-0"
            href={`/profile/${notification?.users?.clerkUserId}`}
          ></Link>
          <div className="flex items-center gap-3 justify-between w-full">
            <div>
              <MessageCircle className="fill-primary" />
            </div>
            <div className="w-full flex items-center gap-3">
              <UserAvatarWithHover
                userId={userId}
                user={notification.users}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-sm flex-wrap">
                  <UserNameWithHover
                    userId={userId}
                    user={notification.users}
                    loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                  />
                  <span className="text-muted-foreground">
                    commented on your post
                  </span>
                </div>
                <span className="text-xs text-muted-foreground w-fit">
                  {getRelativeTime(notification.created_at)}
                </span>
              </div>
            </div>
            <span className="unread"></span>
          </div>

          <CaptionCardMini
            userId={userId}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            notification={notification}
          />
        </div>
      ) : (
        <div className="relative flex flex-col gap-5 items-center hover:bg-muted/20 p-5 cursor-pointer caption-card-notification border-b">
          <Link
            className="absolute inset-0"
            href={`/profile/${notification?.users?.clerkUserId}`}
          ></Link>
          <div className="flex items-center gap-3 justify-between w-full">
            <div>
              <MessageCircle className="fill-primary" />
            </div>
            <div className="w-full flex items-center gap-3">
              <UserAvatarWithHover
                userId={userId}
                user={notification.users}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />{" "}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-sm flex-wrap">
                  <UserNameWithHover
                    userId={userId}
                    user={notification.users}
                    loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                  />
                  <span className="text-muted-foreground">
                    commented on your post
                  </span>
                </div>
                <span className="text-xs text-muted-foreground w-fit">
                  {getRelativeTime(notification.created_at)}
                </span>
              </div>
            </div>
          </div>

          <CaptionCardMini
            userId={userId}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            notification={notification}
          />
        </div>
      )}
    </>
  );
}
