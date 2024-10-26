import FollowingPageInfiniteLoading from "@/components/FollowingPageInfiniteLoading";
import FollowUser from "@/components/FollowUser";
import { getFollowedUsers, getFollowedUsersInfo } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function page({ params }: any) {
  const { userId } = params;

  return (
    <Suspense fallback={<div className="loader self-center"></div>}>
      <UserFollowing userId={userId} />
    </Suspense>
  );
}

async function UserFollowing({ userId }: { userId: string }) {
  const info = await currentUser();
  const followedUsers: any = await getFollowedUsersInfo(userId, 0, 10);
  const loggedInUserFollowedUsers = await getFollowedUsers(userId);

  return (
    <>
      {followedUsers.map((user: any) => (
        <FollowUser
          key={user.users.id}
          showFollowButton={true}
          user={user.users}
          //@ts-expect-error nvm
          userId={info?.id}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      ))}
      <FollowingPageInfiniteLoading
        userId={userId}
        loggedInUserId={info?.id}
        loggedInUserFollowedUsers={loggedInUserFollowedUsers}
      />
    </>
  );
}
