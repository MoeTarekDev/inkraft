import CaptionCard from "@/components/CaptionCard";
import HomePageInfiniteLoading from "@/components/HomePageInfiniteLoading";
import ShowWhoToFollowLayout from "@/components/ShowWhoToFollowLayout";
import { Post } from "@/lib/types";
import { getFollowedUsers, getFollowedUsersPostsAndReposts } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home / inkraft",
};
export default async function Home() {
  return (
    <>
      <ShowWhoToFollowLayout showWhoToFollow={true} className={"mt-[81px]"}>
        <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center w-full sm:pt-[0.5rem] mb-3">
          <Suspense fallback={<div className="loader"></div>}>
            <FollowedUsersPosts />
          </Suspense>
        </div>
      </ShowWhoToFollowLayout>
    </>
  );
}

async function FollowedUsersPosts() {
  const info: any = await currentUser();
  //@ts-expect-error nvm
  const followedUsersPosts: [Post] = await getFollowedUsersPostsAndReposts(
    info.id,
    0,
    10
  );
  const loggedInUserFollowedUsers: any = await getFollowedUsers(info.id);

  return (
    <>
      {followedUsersPosts.length > 0 ? (
        <>
          {followedUsersPosts.map((post: Post) => (
            <CaptionCard
              personalInfo={null}
              bigPost={null}
              key={post.id}
              userId={info?.id}
              userImage={info?.imageUrl}
              post={post}
              rounded={true}
              singlePostMode={false}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
          ))}
          <HomePageInfiniteLoading
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />
        </>
      ) : (
        <div className="mt-9 flex flex-col gap-2 w-[300px]">
          <p className="text-3xl ">Nothing to see here — yet</p>
          <p className="text-muted-foreground text-sm">
            Follow users to see more posts
          </p>
        </div>
      )}
    </>
  );
}
