"use client";
import { getUserFollowersInfo } from "@/lib/users";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FollowUser from "./FollowUser";
export default function FollowersPageInfiniteLoading({
  loggedInUserFollowedUsers,
  userId,
  loggedInUserId,
}: any) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  //   const info: any = useUser();
  const limit = 10;
  useEffect(() => {
    if (inView && hasMore) {
      const getFollowers = async () => {
        const followers: any = await getUserFollowersInfo(
          userId,
          offset,
          limit
        );

        if (followers && followers.length && followers?.length > 0) {
          setData([...data, ...followers]);
          setOffset((prev) => prev + 10);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      };
      getFollowers();
    }
  }, [inView, userId, data, hasMore, offset]);
  return (
    <>
      {data.map((user: any) => (
        <FollowUser
          key={user.users.id}
          showFollowButton={true}
          user={user.users}
          userId={loggedInUserId}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      ))}
      {hasMore && <div ref={ref} className="loader self-center mb-3"></div>}
    </>
  );
}
