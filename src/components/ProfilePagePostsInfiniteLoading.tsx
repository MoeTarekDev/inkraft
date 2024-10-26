"use client";
import { Post } from "@/lib/types";
import { getUserFullPostData } from "@/lib/users";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CaptionCard from "./CaptionCard";
export default function ProfilePagePostsInfiniteLoading({
  loggedInUserFollowedUsers,
  userId,
}: any) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const info = useUser();
  const limit = 10;
  useEffect(() => {
    if (inView && hasMore) {
      const getNotifications = async () => {
        const userPosts: any = await getUserFullPostData(userId, offset, limit);

        if (userPosts && userPosts.length && userPosts?.length > 0) {
          setData([...data, ...userPosts]);
          setOffset((prev) => prev + 10);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      };
      getNotifications();
    }
  }, [inView, userId, data, hasMore, offset]);
  return (
    <>
      {data?.map((post: Post) => (
        <CaptionCard
          userImage={info?.user?.imageUrl}
          personalInfo={null}
          bigPost={null}
          //@ts-expect-error nvm
          userId={info?.user?.id}
          post={post}
          key={post.id}
          rounded={false}
          singlePostMode={false}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      ))}
      {hasMore && <div ref={ref} className="loader self-center mb-3"></div>}
    </>
  );
}
