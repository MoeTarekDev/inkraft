import { User } from "@/lib/types";
import { whoToFollow } from "@/lib/users";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FollowUser from "./FollowUser";

export default async function WhoToFollow({ loggedInUserFollowedUsers }: any) {
  const { userId }: any = auth();
  const users = await whoToFollow(userId);
  // console.log(users);

  return (
    <div className="rounded-lg bg-card flex flex-col  h-fit border-2">
      <h2 className="font-bold text-lg p-3"> Who to follow</h2>
      {users && users.length > 0 ? (
        <div>
          <div>
            {users
              ?.filter((user, index) => index < 3)
              .map((user: User) => (
                <FollowUser
                  key={user.id}
                  showFollowButton={true}
                  user={user}
                  userId={userId}
                  loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                />
              ))}
          </div>
          {users && users.length > 2 ? (
            <Link
              className="p-3 block text-sm hover:bg-accent"
              href="/suggested"
            >
              Show more
            </Link>
          ) : null}
        </div>
      ) : (
        <p className="p-3  text-muted-foreground">
          It seems like you have followed all active users, new users will
          appear here.
        </p>
      )}
    </div>
  );
}
