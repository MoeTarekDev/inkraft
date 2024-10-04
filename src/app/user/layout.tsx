import FollowersAndFollowingNavbar from "@/components/FollowersAndFollowingNavbar";
import WhoToFollow from "@/components/WhoToFollow";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="grid grid-cols-12 w-full sm:pr-5 space-x-4 h-full ">
        <div className="col-span-full lg:col-span-8 flex flex-col  items-center relative border-r ">
          <div className=" border-b w-full sticky sm:p-2 left-0 right-0 top-0 backdrop-blur-md bg-card/3 z-[999]">
            <div className="flex flex-col p-4 sm:p-0 sm:pb-4 ">
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
