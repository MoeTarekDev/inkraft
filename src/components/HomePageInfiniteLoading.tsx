"use client";
import { Post } from "@/lib/types";
import { getFollowedUsersPostsAndReposts } from "@/lib/users";
import { useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import CaptionCard from "./CaptionCard";

export default function HomePageInfiniteLoading({
  loggedInUserFollowedUsers,
}: any) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true); // To track if there's more to load
  const [offset, setOffset] = useState(10); // Localize the offset

  const info: any = useUser();
  const id = useMemo(() => {
    return info?.user?.id;
  }, [info?.user]);
  const limit = 10;
  useEffect(() => {
    if (inView && hasMore) {
      const fetchData = async () => {
        //   @ts-expect-error nvm
        const followedUsersPosts: [Post] =
          await getFollowedUsersPostsAndReposts(id, offset, limit);
        if (followedUsersPosts.length > 0) {
          setHasMore(true);
          setData([...data, ...followedUsersPosts]);
          setOffset((prevOffset) => prevOffset + limit); // Increment the offset
        } else {
          setHasMore(false);
        }
      };
      fetchData();
    }
  }, [inView, id, data, hasMore, offset]);

  return (
    <>
      {data.map((post: Post) => (
        <CaptionCard
          personalInfo={null}
          bigPost={null}
          key={post.id}
          userId={id}
          userImage={info?.user.imageUrl}
          post={post}
          rounded={true}
          singlePostMode={false}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      ))}
      {hasMore && <div ref={ref} className="loader"></div>}
    </>
  );
}
