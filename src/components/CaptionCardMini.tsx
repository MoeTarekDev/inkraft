"use client";
import Image from "next/image";
import Link from "next/link";
import { CommentBigPost, Notification } from "@/lib/types";
import { getRelativeTime } from "@/lib/features";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import UserUserNameWithHover from "./UserUserNameWithHover";
import { readNotification } from "@/lib/actions";

export default function CaptionCardMini({
  singlePostMode,
  comment,
  userId,
  loggedInUserFollowedUsers,
  notification,
}: {
  singlePostMode: boolean;
  comment: CommentBigPost | null;
  userId: string;
  loggedInUserFollowedUsers: any;
  notification: Notification | null;
}) {
  console.log(comment);

  if (singlePostMode)
    return (
      <article className="bg-card w-full flex gap-3 h-fit pt-5">
        <div className="w-full flex flex-col flex-wrap">
          <div className="flex items-center gap-3 ">
            <UserAvatarWithHover
              user={comment?.users}
              userId={userId}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
            <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2">
              <UserNameWithHover
                user={comment?.users}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <UserUserNameWithHover
                user={comment?.users}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <div className=" flex items-center gap-1 line-clamp-1">
                <span className="dot"></span>
                <span className="text-muted-foreground text-xs">
                  {getRelativeTime(comment?.created_at)}
                </span>
              </div>
            </div>
          </div>
          <p className="ms-[47px]">{comment?.content}</p>
        </div>
      </article>
    );
  return (
    <>
      {!notification?.read ? (
        <article className="relative rounded-lg bg-card w-full md:w-[90%] flex gap-3 p-3 sm:p-5 h-fit border-2 z-20 hover:bg-muted/40">
          <Link
            onClick={async () => {
              await readNotification(userId, notification?.id);
            }}
            className="absolute inset-0 z-10"
            href={`/${notification?.posts?.users.userName}/status/${notification?.posts?.id}`}
          ></Link>
          <div className="w-full flex flex-col gap-3 flex-wrap">
            <div className="flex items-center gap-3 ">
              <UserAvatarWithHover
                userId={userId}
                user={notification?.posts?.users}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2">
                <UserNameWithHover
                  userId={userId}
                  user={notification?.posts?.users}
                  loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                />
                <UserUserNameWithHover
                  userId={userId}
                  user={notification?.posts?.users}
                  loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                />
                <div className="text-muted-foreground text-xs text-center line-clamp-1 z-30">
                  <span className="dot me-1"></span>
                  <span>
                    {getRelativeTime(notification?.posts?.created_at)}
                  </span>
                </div>
              </div>
            </div>
            <p>{notification?.posts?.caption}</p>
            {notification?.posts?.image && (
              <div className="relative w-full h-[400px] pb-[56.25%] rounded-lg overflow-hidden">
                <Image
                  src={notification?.posts?.image}
                  alt="post image"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </article>
      ) : (
        <article className="relative rounded-lg bg-card w-full md:w-[90%] flex gap-3 p-3 sm:p-5 h-fit border-2 z-20 hover:bg-muted/40">
          <Link
            className="absolute inset-0 z-10"
            href={`/${notification?.posts?.users.userName}/status/${notification?.posts?.id}`}
          ></Link>
          <div className="w-full flex flex-col gap-3 flex-wrap">
            <div className="flex items-center gap-3 ">
              <UserAvatarWithHover
                userId={userId}
                user={notification?.posts?.users}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2">
                <UserNameWithHover
                  userId={userId}
                  user={notification?.posts?.users}
                  loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                />
                <UserUserNameWithHover
                  userId={userId}
                  user={notification?.posts?.users}
                  loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                />
                <div className="text-muted-foreground text-xs text-center line-clamp-1 z-30">
                  <span className="dot me-1"></span>
                  <span>
                    {getRelativeTime(notification?.posts?.created_at)}
                  </span>
                </div>
              </div>
            </div>
            <p>{notification?.posts?.caption}</p>
            {notification?.posts?.image && (
              <div className="relative w-full h-[400px] pb-[56.25%] rounded-lg overflow-hidden">
                <Image
                  src={notification?.posts?.image}
                  alt="post image"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </article>
      )}
    </>
  );
}
