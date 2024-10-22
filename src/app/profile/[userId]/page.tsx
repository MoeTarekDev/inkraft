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

import EditBio from "@/components/EditBio";
import ProfilePageAvatarImage from "@/components/ProfilePageAvatarImage";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import ProfilePageCoverImage from "@/components/ProfilePageCoverImage";

export default async function page({ params }: any) {
  const info: any = await currentUser();
  const { userId } = params;
  const userBaseInfo = await getUser(userId);
  const userPosts: any = await getUserFullPostData(userId);
  const followedUsers: any = await getFollowedUsers(userId);
  const myFollowers: any = await getUserFollowers(userId);
  const loggedInUserFollowedUsers: any = await getFollowedUsers(info.id);
  const bookmarkedPosts: any = await getUserBookmarkedPosts(userId);

  return (
    <section className="w-full flex flex-col mt-[81px] sm:mt-0 items-center gap-10">
      <div className=" self-stretch">
        <div className="h-[300px] w-full relative">
          <ProfilePageCoverImage userBaseInfo={userBaseInfo} />
          <ProfilePageAvatarImage userBaseInfo={userBaseInfo} />
        </div>
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
          <EditBio userBaseInfo={userBaseInfo} userId={info?.id} />
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
          {info.id === userId ? null : (
            <FollowButton
              followerId={info.id}
              followedId={
                userBaseInfo &&
                userBaseInfo.length &&
                userBaseInfo[0].clerkUserId
              }
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
          )}
        </div>
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
            className="w-full md:w-[80%] lg:w-[60%] sm:px-5 "
          >
            <div className="w-full col-span-full px-5">
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
                </div>
              )}
            </div>
          </TabsContent>
          {userId === info?.id ? (
            <TabsContent
              value="saved"
              className="w-full md:w-[80%] lg:w-[60%] sm:px-5 grid grid-cols-1 place-items-center"
            >
              {bookmarkedPosts.length > 0 ? (
                bookmarkedPosts.map((post: Post) => (
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
                ))
              ) : (
                <div className="mt-8">
                  <h2 className="text-center">Save posts for later</h2>
                  <p className="text-center text-muted-foreground">
                    Bookmark posts to easily find them again in the future
                  </p>
                </div>
              )}
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </section>
  );
}
