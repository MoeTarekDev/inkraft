import CaptionCard from "@/components/CaptionCard";
import WhoToFollow from "@/components/WhoToFollow";
import { Post } from "@/lib/types";
import {
  getFollowedUsers,
  getFollowedUsersPostsAndReposts,
  getUser,
} from "@/lib/users";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const info: any = await currentUser();
  // const userBaseInfo = await getUser(myUserId);
  //@ts-expect-error nvm
  const followedUsersPosts: [Post] = await getFollowedUsersPostsAndReposts(
    info.id
  );
  const loggedInUserFollowedUsers: any = await getFollowedUsers(info.id);

  return (
    <>
      <section className="grid grid-cols-12 w-full sm:p-5 space-x-4 mt-[81px] sm:mt-0 self-start">
        <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center">
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
            </>
          ) : (
            <div className="mt-9 flex flex-col gap-2 w-[300px]">
              <p className="text-3xl ">Nothing to see here — yet</p>
              <p className="text-muted-foreground text-sm">
                Follow users to see more posts
              </p>
            </div>
          )}
        </div>
        <aside className="col-span-4 hidden lg:block">
          <WhoToFollow loggedInUserFollowedUsers={loggedInUserFollowedUsers} />
        </aside>
      </section>
    </>
  );
}
