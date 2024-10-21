import FollowUser from "@/components/FollowUser";
import WhoToFollow from "@/components/WhoToFollow";
import { User } from "@/lib/types";
import { whoToFollow } from "@/lib/users";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const { userId }: any = auth();
  const users = await whoToFollow(userId);
  return (
    <>
      <section className="grid grid-cols-12 w-full mt-[82px] sm:mt-0 space-x-4 self-start">
        <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center">
          <div className="pb-5 border-b w-full p-5">
            <div className="flex flex-col">
              <h3 className="font-bold text-xl ">Suggested</h3>
            </div>
          </div>
          <div className="self-stretch">
            {users?.map((user: User) => (
              <FollowUser
                key={user.id}
                showFollowButton={true}
                user={user}
                userId={userId}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
