"use client";
import { getFollowedUsersInfo } from "@/lib/users";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FollowUser from "./FollowUser";
export default function FollowingPageInfiniteLoading({
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
      const getFollowing = async () => {
        const followedUsers: any = await getFollowedUsersInfo(
          userId,
          offset,
          limit
        );

        if (
          followedUsers &&
          followedUsers.length &&
          followedUsers?.length > 0
        ) {
          setData([...data, ...followedUsers]);
          setOffset((prev) => prev + 10);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      };
      getFollowing();
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
