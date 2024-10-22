import NotificationsAsyncPart from "@/components/NotificationsAsyncPart";
import ReadAllNotifications from "@/components/ReadAllNotifications";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function page() {
  const info = await currentUser();

  return (
    <section className="grid grid-cols-12 w-full mt-[81px] sm:mt-0 sm:pr-5 space-x-4 self-start h-full">
      <div className="col-span-full lg:col-span-8 flex flex-col border-r">
        <ReadAllNotifications userId={info?.id} />
        <NotificationsAsyncPart info={info} />
      </div>
      <aside className="col-span-4 hidden lg:block mt-2">
        <WhoToFollow />
      </aside>
    </section>
  );
}
