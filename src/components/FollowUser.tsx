import { User } from "@/lib/types";
import Link from "next/link";
import FollowButton from "./FollowButton";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import UserUserNameWithHover from "./UserUserNameWithHover";
interface FollowUserProps {
  showFollowButton: boolean;
  user: User;
  userId: string;
  loggedInUserFollowedUsers: any;
}
export default function FollowUser({
  showFollowButton,
  user,
  userId,
  loggedInUserFollowedUsers,
}: FollowUserProps) {
  {
    return (
      <div className="flex items-center justify-between hover:bg-accent p-3 relative ">
        <Link
          className="absolute inset-0 z-10"
          href={`/profile/${user?.clerkUserId}`}
        ></Link>
        <div className="flex items-center flex-1 gap-1">
          <UserAvatarWithHover
            user={user}
            userId={userId}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />

          <div className="flex items-center justify-between ">
            <div className="flex flex-col text-xs ">
              <UserNameWithHover
                user={user}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <UserUserNameWithHover
                user={user}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
            </div>
          </div>
        </div>
        {showFollowButton && userId != user.clerkUserId ? (
          <FollowButton
            followerId={userId}
            followedId={user?.clerkUserId}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          >
            Follow
          </FollowButton>
        ) : null}
      </div>
    );
  }
}
