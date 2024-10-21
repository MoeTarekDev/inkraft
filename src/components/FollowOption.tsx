import { followUser, unFollowUser } from "@/lib/users";
import { UserRoundPlus, UserRoundX } from "lucide-react";
import { useEffect, useState } from "react";

export default function FollowOption({
  loggedInUserFollowedUsers,
  followerId,
  user,
  followedId,
  setIsOpen,
}: any) {
  const [isUserFollowed, setIsUserFollowed] = useState([]);

  useEffect(() => {
    const x = loggedInUserFollowedUsers.filter(
      (user: any) => user.followedId === followedId
    );
    setIsUserFollowed(x);
  }, [loggedInUserFollowedUsers]);
  return (
    <>
      {isUserFollowed.length > 0 ? (
        <li
          onClick={() => {
            unFollowUser(followerId, followedId);
            setIsOpen(false);
          }}
          className="p-4 flex items-center gap-2 hover:bg-accent rounded-t-md cursor-pointer"
        >
          <UserRoundX className="w-5 h-5" />
          <span>UnFollow @{user?.userName}</span>
        </li>
      ) : (
        <li
          onClick={() => {
            followUser(followerId, followedId);
            setIsOpen(false);
          }}
          className="p-4 flex items-center gap-2 hover:bg-accent rounded-t-md cursor-pointer"
        >
          <UserRoundPlus className="w-5 h-5" />
          <span>Follow @{user?.userName}</span>
        </li>
      )}
    </>
  );
}
