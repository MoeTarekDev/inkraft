import CaptionCard from "@/components/CaptionCard";
import FollowButton from "@/components/FollowButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/lib/types";
import {
  getFollowedUsers,
  getUser,
  getUserBookmarkedPosts,
  getUserFollowers,
  getUserFullPostData,
} from "@/lib/users";

import BookmarksPageInfiniteLoading from "@/components/BookmarksPageInfiniteLoading";
import EditBio from "@/components/EditBio";
import ProfilePageAvatarImage from "@/components/ProfilePageAvatarImage";
import ProfilePageCoverImage from "@/components/ProfilePageCoverImage";
import ProfilePagePostsInfiniteLoading from "@/components/ProfilePagePostsInfiniteLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
export async function generateMetadata({ params }: any) {
  try {
    const user = await getUser(params.userId);
    const name = `${user[0].firstName} ${user[0].lastName}`;
    const userName = `${user[0].userName}`;
    return { title: `${name} (${userName})`, default: "profile" };
  } catch (error) {
    console.log(error);

    notFound();
  }
}
export default async function page({ params }: any) {
  const info: any = await currentUser();
  const { userId } = params;
  const userBaseInfo = await getUser(userId);

  if (!userBaseInfo || userBaseInfo.length === 0) notFound();
  return (
    <section className="w-full flex flex-col mt-[81px] sm:mt-0 items-center gap-10 sm:border-r h-full">
      <div className="self-stretch">
        <div className="h-[300px] w-full relative">
          <ProfilePageCoverImage />
          <ProfilePageAvatarImage userBaseInfo={userBaseInfo} />
        </div>
        <Suspense fallback={<UserPersonalInfoSkeleton />}>
          <UserPersonalInfo userId={userId} currentUserId={info?.id} />
        </Suspense>
      </div>
      <div className="self-stretch">
        <Tabs
          defaultValue="posts"
          className="w-full flex flex-col items-center"
        >
          <TabsList className="w-[250px] flex items-center">
            <TabsTrigger className="flex-1" value="posts">
              Posts
            </TabsTrigger>
            {userId === info?.id ? (
              <TabsTrigger className="flex-1" value="saved">
                Saved
              </TabsTrigger>
            ) : null}
          </TabsList>
          <TabsContent
            value="posts"
            className="w-full md:w-[80%] lg:w-[60%] sm:px-5 grid grid-cols-1 place-items-center "
          >
            <Suspense fallback={<div className="loader"></div>}>
              <GetPosts userId={userId} />
            </Suspense>
          </TabsContent>
          {userId === info?.id ? (
            <TabsContent
              value="saved"
              className="w-full md:w-[80%] lg:w-[60%] sm:px-5 grid grid-cols-1 place-items-center"
            >
              <Suspense fallback={<div className="loader"></div>}>
                <GetBookmarks userId={userId} />
              </Suspense>
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </section>
  );
}

async function UserPersonalInfo({
  userId,
  currentUserId,
}: {
  userId: string;
  currentUserId: string;
}) {
  const [userBaseInfo, followedUsers, myFollowers, loggedInUserFollowedUsers] =
    await Promise.all([
      getUser(userId),
      getFollowedUsers(userId),
      getUserFollowers(userId),
      getFollowedUsers(currentUserId),
    ]);

  if (!userBaseInfo || userBaseInfo.length === 0) notFound();
  return (
    <>
      <div className="mt-20 flex flex-col gap-2 items-center">
        <div className="flex flex-col items-center">
          <div className="text-xl font-semibold flex items-center gap-1">
            <span>{userBaseInfo && userBaseInfo[0].firstName}</span>
            <span>{userBaseInfo && userBaseInfo[0].lastName}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            @{userBaseInfo && userBaseInfo[0].userName}
          </span>
        </div>
        <EditBio userBaseInfo={userBaseInfo} userId={currentUserId} />
        <div className="flex items-center gap-2">
          <Link
            href={`/profile/${userId}/connections/followers`}
            className="text-sm  hover:underline cursor-pointer"
          >
            <span className="font-semibold">
              {myFollowers.length}{" "}
              <span className="text-muted-foreground">Followers</span>
            </span>
          </Link>
          <Link
            href={`/profile/${userId}/connections/following`}
            className="text-sm hover:underline cursor-pointer"
          >
            <span className="font-semibold">
              {followedUsers.length}{" "}
              <span className="text-muted-foreground">Following</span>
            </span>
          </Link>
        </div>
        {currentUserId === userId ? null : (
          <FollowButton
            followerId={currentUserId}
            followedId={
              userBaseInfo && userBaseInfo.length && userBaseInfo[0].clerkUserId
            }
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />
        )}
      </div>
    </>
  );
}

function UserPersonalInfoSkeleton() {
  return (
    <div className="mt-20 flex flex-col gap-2 items-center min-h-[200px]">
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold flex items-center gap-1">
          <Skeleton className="w-[100px] h-4" />
          <Skeleton className="w-[100px] h-4" />
        </div>
        <Skeleton className="w-[100px] h-4 mt-2" />
      </div>
      <Skeleton className="w-[250px] h-4" />
      <Skeleton className="w-[100px] h-4" />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Skeleton className="w-[40px] h-4" />
          <span className="text-muted-foreground">Followers</span>
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="w-[40px] h-4" />
          <span className="text-muted-foreground">Following</span>
        </div>
      </div>
      <Skeleton className="w-[50px] h-8" />
    </div>
  );
}
async function GetPosts({ userId }: any) {
  const info: any = await currentUser();
  const userPosts: any = await getUserFullPostData(userId, 0, 10);
  const loggedInUserFollowedUsers: any = await getFollowedUsers(info.id);
  // console.log(userPosts);

  return (
    <>
      <div className="w-full col-span-full px-5 mb-3">
        {userPosts && userPosts.length < 1 ? (
          userId === info?.id ? (
            <p className="text-center">
              Nothing to show...yet! Posts you create will live here.
            </p>
          ) : (
            <p className="text-center">Nothing to show...yet!</p>
          )
        ) : (
          <div className="grid grid-cols-1 place-items-center">
            {userPosts?.map((post: Post) => (
              <CaptionCard
                userImage={info.imageUrl}
                personalInfo={info}
                bigPost={null}
                userId={info.id}
                post={post}
                key={post.id}
                rounded={false}
                singlePostMode={false}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
            ))}
            <ProfilePagePostsInfiniteLoading
              userId={userId}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
          </div>
        )}
      </div>
    </>
  );
}

async function GetBookmarks({ userId }: any) {
  const info: any = await currentUser();
  const bookmarkedPosts: any = await getUserBookmarkedPosts(userId, 0, 10);
  const loggedInUserFollowedUsers: any = await getFollowedUsers(info.id);

  return (
    <>
      {bookmarkedPosts.length > 0 ? (
        <>
          {bookmarkedPosts.map((post: Post) => (
            <CaptionCard
              userImage={info.imageUrl}
              personalInfo={null}
              bigPost={null}
              userId={info.id}
              post={post}
              key={post.id}
              rounded={false}
              singlePostMode={false}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
          ))}
          <BookmarksPageInfiniteLoading
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />
        </>
      ) : (
        <div className="mb-3">
          <h2 className="text-center">Save posts for later</h2>
          <p className="text-center text-muted-foreground">
            Bookmark posts to easily find them again in the future
          </p>
        </div>
      )}
    </>
  );
}
