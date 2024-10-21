import FollowUser from "@/components/FollowUser";
import { getFollowedUsers, getFollowedUsersInfo } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";

export default async function page({ params }: any) {
  const info = await currentUser();
  const { userId } = params;
  const followedUsers: any = await getFollowedUsersInfo(userId);
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
    </>
  );
}
