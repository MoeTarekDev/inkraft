"use client";
import { Post } from "@/lib/types";
import { getUserBookmarkedPosts } from "@/lib/users";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CaptionCard from "./CaptionCard";
export default function BookmarksPageInfiniteLoading({
  loggedInUserFollowedUsers,
}: any) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const info: any = useUser();
  const limit = 10;
  useEffect(() => {
    if (inView && hasMore) {
      const getBookmarks = async () => {
        const bookmarks: any = await getUserBookmarkedPosts(
          info?.user?.id,
          offset,
          limit
        );
        if (bookmarks && bookmarks.length && bookmarks?.length > 0) {
          setData([...data, ...bookmarks]);
          setOffset((prev) => prev + 10);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      };
      getBookmarks();
    }
  }, [inView, info?.user?.id, data, hasMore, offset]);
  return (
    <>
      <div className="flex flex-col w-full">
        {data.map((post: Post) => (
          <CaptionCard
            personalInfo={null}
            bigPost={null}
            key={post.id}
            userId={info?.user?.id}
            userImage={info?.user?.imageUrl}
            post={post}
            rounded={false}
            singlePostMode={false}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />
        ))}
        {hasMore && <div ref={ref} className="loader self-center mb-3"></div>}
      </div>
    </>
  );
}
