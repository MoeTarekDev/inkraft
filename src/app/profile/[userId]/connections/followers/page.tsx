import FollowersPageInfiniteLoading from "@/components/FollowersPageInfiniteLoading";
import FollowUser from "@/components/FollowUser";
import { getFollowedUsers, getUserFollowersInfo } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function page({ params }: any) {
  const { userId } = params;

  return (
    <Suspense fallback={<div className="loader self-center mx-auto"></div>}>
      <UserFollowers userId={userId} />
    </Suspense>
  );
}

async function UserFollowers({ userId }: { userId: string }) {
  const info = await currentUser();
  const [followers, loggedInUserFollowedUsers] = await Promise.all([
    getUserFollowersInfo(userId, 0, 10),
    getFollowedUsers(info?.id),
  ]);

  return (
    <>
      {followers.map((user: any) => (
        <FollowUser
          key={user.users.id}
          showFollowButton={true}
          user={user.users}
          //@ts-expect-error nvm
          userId={info?.id}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      ))}
      <FollowersPageInfiniteLoading
        userId={userId}
        loggedInUserId={info?.id}
        loggedInUserFollowedUsers={loggedInUserFollowedUsers}
      />
    </>
  );
}
