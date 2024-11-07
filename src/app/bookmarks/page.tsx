import BookmarksPageInfiniteLoading from "@/components/BookmarksPageInfiniteLoading";
import CaptionCard from "@/components/CaptionCard";
import DeleteAllBookmarks from "@/components/DeleteAllBookmarks";
import ShowWhoToFollowLayout from "@/components/ShowWhoToFollowLayout";
import { getFollowedUsers, getUserBookmarkedPosts } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default async function page() {
  const info: any = await currentUser();

  return (
    <ShowWhoToFollowLayout className={"mt-0"} showWhoToFollow={true}>
      <div className="col-span-full lg:col-span-8 flex flex-col sm:border-r relative h-full">
        <div className=" flex items-center justify-between p-5 pb-5 border-b sticky top-0 z-40 bg-card/30 backdrop-blur-md">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">Bookmarks</h3>
            <span className="text-muted-foreground text-sm">
              @{info?.username}
            </span>
          </div>
          <DeleteAllBookmarks userId={info?.id} />
        </div>
        <Suspense fallback={<div className="loader self-center"></div>}>
          <UserBookmarks userId={info?.id} userImage={info?.imageUrl} />
        </Suspense>
      </div>
    </ShowWhoToFollowLayout>
  );
}

async function UserBookmarks({ userId, userImage }: any) {
  const [bookmarkedPosts, loggedInUserFollowedUsers] = await Promise.all([
    getUserBookmarkedPosts(userId, 0, 10),
    getFollowedUsers(userId),
  ]);

  return (
    <>
      {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
        <div>
          {bookmarkedPosts.map((post: any) => (
            <CaptionCard
              personalInfo={null}
              bigPost={null}
              key={post.id}
              userId={userId}
              userImage={userImage}
              post={post}
              rounded={false}
              singlePostMode={false}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
          ))}
          <BookmarksPageInfiniteLoading
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />
        </div>
      ) : (
        <div className="max-w-[400px] mt-11 flex items-center justify-center self-center px-5">
          <p className="text-3xl">No Bookmarks here — yet ...</p>
        </div>
      )}
    </>
  );
}
