import FollowersAndFollowingNavbar from "@/components/FollowersAndFollowingNavbar";
import WhoToFollow from "@/components/WhoToFollow";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="grid grid-cols-12 w-full sm:p-5 space-x-4">
        <div className="col-span-full lg:col-span-8 flex flex-col  items-center">
          <div className=" border-b w-full">
            <div className="flex flex-col p-4 sm:p-0 sm:pb-4">
              <h3 className="font-bold text-xl ">Moe Tarek</h3>
              <span className="text-muted-foreground text-sm">@moeTarek</span>
            </div>
            <FollowersAndFollowingNavbar />
          </div>
          <div className="self-stretch">{children}</div>
        </div>
        <aside className="col-span-4 hidden lg:block">
          <WhoToFollow />
        </aside>
      </section>
    </>
  );
}
