import Image from "next/image";
import Link from "next/link";
import placeholder from "../../public/sunset.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentBigPost } from "@/lib/types";
import { getRelativeTime } from "@/lib/features";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import UserUserNameWithHover from "./UserUserNameWithHover";

export default async function CaptionCardMini({
  singlePostMode,
  comment,
  userId,
  loggedInUserFollowedUsers,
}: {
  singlePostMode: boolean;
  comment: CommentBigPost;
  userId: string;
  loggedInUserFollowedUsers: any;
}) {
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
                  {getRelativeTime(comment.created_at)}
                </span>
              </div>
            </div>
          </div>
          <p className="ms-[47px]">{comment?.content}</p>
        </div>
      </article>
    );
  return (
    <article className="rounded-lg bg-card w-full md:w-[90%] flex gap-3 p-3 sm:p-5 h-fit border-2">
      <div className="w-full flex flex-col gap-3 flex-wrap">
        <div className="flex items-center gap-3 ">
          <Avatar className="w-9 h-9">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="user image"
              className="w-9 h-9 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2">
            <Link
              href="/profile"
              className="font-semibold hover:underline line-clamp-1 cursor-pointer"
            >
              Moe Tarek
            </Link>
            <Link
              href="/profile"
              className="text-muted-foreground line-clamp-1 cursor-pointer"
            >
              @moetarek
            </Link>
            <span className="text-muted-foreground text-xs text-center line-clamp-1">
              . Just now
            </span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
          officiis quod sed beatae neque minus quae fugiat exercitationem, eius
          architecto.
        </p>
        <div className="relative w-full h-[300px] rounded-md">
          <Image
            src={placeholder}
            alt="post image"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </article>
  );
}
