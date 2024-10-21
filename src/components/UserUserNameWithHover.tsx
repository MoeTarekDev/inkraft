import { User } from "@/lib/types";
import ProfileCard from "./ProfileCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Link from "next/link";

export default function UserUserNameWithHover({
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
          className="text-muted-foreground line-clamp-1 z-20 cursor-pointer"
        >
          @{user?.userName}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 cursor-default">
        <ProfileCard
          followingCount={user?.following?.length}
          followersCount={user?.followers?.length}
          user={user}
          userId={userId}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
