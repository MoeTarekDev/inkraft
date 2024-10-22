import FollowersAndFollowingNavbar from "@/components/FollowersAndFollowingNavbar";
import WhoToFollow from "@/components/WhoToFollow";
import { getUser } from "@/lib/users";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { userId } = params;
  const info = await getUser(userId);

  return (
    <>
      <section className="grid grid-cols-12 w-full sm:pr-5 space-x-4 h-full ">
        <div className="col-span-full lg:col-span-8 flex flex-col items-center relative border-r ">
          <div className=" border-b w-full sticky p-2 left-0 right-0 top-0 backdrop-blur-md bg-card/3 z-[999]">
            <div className="flex flex-col p-2 sm:p-2 sm:pb-4 ">
              <h3 className="font-bold text-xl">
                {info && info.length && info[0].firstName}{" "}
                {info && info.length && info[0].lastName}
              </h3>
              <span className="text-muted-foreground text-sm">
                @{info && info[0] && info[0].userName}
              </span>
            </div>
            <FollowersAndFollowingNavbar />
          </div>
          <div className="self-stretch">{children}</div>
        </div>
        <aside className="col-span-4 hidden lg:block pt-5">
          <WhoToFollow />
        </aside>
      </section>
    </>
  );
}
