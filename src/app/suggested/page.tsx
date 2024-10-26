import FollowUser from "@/components/FollowUser";
import SuggestedPageInfiniteLoading from "@/components/SuggestedPageInfiniteLoading";
import { User } from "@/lib/types";
import { getFollowedUsers, whoToFollow } from "@/lib/users";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function page() {
  return (
    <>
      <section className="grid grid-cols-12 w-full mt-[82px] sm:mt-0 space-x-4 self-start h-full">
        <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center border-r h-full">
          <div className="pb-5 border-b w-full p-5">
            <div className="flex flex-col">
              <h3 className="font-bold text-xl ">Suggested</h3>
            </div>
          </div>
          <Suspense fallback={<div className="loader"></div>}>
            <SuggestedUsers />
          </Suspense>
        </div>
      </section>
    </>
  );
}

async function SuggestedUsers() {
  const { userId }: any = auth();
  const users = await whoToFollow(userId, 0, 10);
  const loggedInUserFollowedUsers: any = await getFollowedUsers(userId);

  return (
    <div className="self-stretch">
      {users?.map((user: User) => (
        <FollowUser
          key={user.id}
          showFollowButton={true}
          user={user}
          userId={userId}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      ))}
      <SuggestedPageInfiniteLoading
        userId={userId}
        loggedInUserFollowedUsers={loggedInUserFollowedUsers}
      />
    </div>
  );
}
