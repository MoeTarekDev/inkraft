import { User } from "@/lib/types";
import Link from "next/link";
import FollowButton from "./FollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ProfileCard({
  user,
  userId,
  loggedInUserFollowedUsers,
  followingCount,
  followersCount,
}: {
  user: User;
  userId: string;
  loggedInUserFollowedUsers: any;
  followingCount: number;
  followersCount: number;
}) {
  return (
    <div className="flex flex-col gap-2 relative z-[999999]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href={`/profile/${user?.clerkUserId}`}>
            <Avatar>
              <AvatarImage
                src={user?.imageUrl}
                alt="user image"
                className="w-9 h-9 rounded-full"
              />
              <AvatarFallback>
                {user ? user?.firstName[0] + user?.lastName[0] : "CN"}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex flex-col text-xs ">
              <Link
                href={`/profile/${user?.clerkUserId}`}
                className="font-semibold hover:underline flex items-center gap-1"
              >
                <span>{user?.firstName}</span>
                <span>{user?.lastName}</span>
              </Link>
              <Link
                href={`/profile/${user?.clerkUserId}`}
                className="text-muted-foreground"
              >
                @{user?.userName}
              </Link>
            </div>
          </div>
        </div>
        {userId != user?.clerkUserId ? (
          <div>
            <FollowButton
              followedId={user?.clerkUserId}
              followerId={userId}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
          </div>
        ) : null}
      </div>
      <p className="w-fit text-sm ">{user?.bio}</p>
      <div className="flex items-center gap-2">
        <div className="text-sm  hover:underline cursor-pointer">
          <Link
            href={`/profile/${user.clerkUserId}/connections/followers`}
            className="font-semibold"
          >
            {followersCount}{" "}
            <span className="text-muted-foreground">Followers</span>
          </Link>
        </div>
        <div className="text-sm hover:underline cursor-pointer">
          <Link
            href={`/profile/${user.clerkUserId}/connections/following`}
            className="font-semibold"
          >
            {followingCount}{" "}
            <span className="text-muted-foreground">Following</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
