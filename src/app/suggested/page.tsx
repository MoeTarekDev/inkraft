import FollowUser from "@/components/FollowUser";
import WhoToFollow from "@/components/WhoToFollow";

export default function page() {
  return (
    <>
      <section className="grid grid-cols-12 w-full sm:p-5 space-x-4">
        <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center">
          <div className="pb-5 border-b w-full">
            <div className="flex flex-col">
              <h3 className="font-bold text-xl ">Suggested</h3>
            </div>
          </div>
          <div className="self-stretch">
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
            <FollowUser showFollowButton={true} />
          </div>
        </div>
        <aside className="col-span-4 hidden lg:block">
          <WhoToFollow />
        </aside>
      </section>
    </>
  );
}
