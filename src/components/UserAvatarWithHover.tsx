import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function UserAvatarWithHover({
  user,
  userId,
  loggedInUserFollowedUsers,
}: {
  user: any;
  userId: string;
  loggedInUserFollowedUsers: any;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          href={`/profile/${user?.clerkUserId}`}
          className="w-9 h-9 flex-shrink-0 z-20 cursor-pointer"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={user?.imageUrl}
              alt="user image"
              className="w-full h-full rounded-full object-cover"
            />
            <AvatarFallback>
              {user ? user.firstName[0] + user.lastName[0] : "CN"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 cursor-default">
        <ProfileCard
          user={user}
          userId={userId}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          followingCount={user?.following?.length}
          followersCount={user?.followers?.length}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
