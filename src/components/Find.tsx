import { allUsersExceptMe, getFollowedUsers } from "@/lib/users";
import { auth } from "@clerk/nextjs/server";
import FindLogic from "./FindLogic";

export default async function Find() {
  const { userId }: any = auth();
  const users = await allUsersExceptMe(userId);
  const loggedInUserFollowedUsers: any = await getFollowedUsers(userId);

  return (
    <FindLogic
      users={users}
      userId={userId}
      loggedInUserFollowedUsers={loggedInUserFollowedUsers}
    />
  );
}
