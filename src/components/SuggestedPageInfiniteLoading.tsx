"use client";
import { User } from "@/lib/types";
import { whoToFollow } from "@/lib/users";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FollowUser from "./FollowUser";
export default function SuggestedPageInfiniteLoading({
  loggedInUserFollowedUsers,
  userId,
}: any) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 10;
  useEffect(() => {
    if (inView && hasMore) {
      const getSuggested = async () => {
        const users = await whoToFollow(userId, offset, limit);

        if (users && users.length && users?.length > 0) {
          setData([...data, ...users]);
          setOffset((prev) => prev + 10);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      };
      getSuggested();
    }
  }, [inView, userId, data, hasMore, offset]);
  return (
    <>
      <div className="flex flex-col w-full">
        {data?.map((user: User) => (
          <FollowUser
            key={user.id}
            showFollowButton={true}
            user={user}
            userId={userId}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />
        ))}
        {hasMore && <div ref={ref} className="loader self-center mb-3"></div>}
      </div>
    </>
  );
}
