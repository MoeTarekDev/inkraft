import NotificationCmmented from "@/components/NotificationCmmented";
import NotificationFollow from "@/components/NotificationFollow";
import NotificationVoted from "@/components/NotificationVoted";
import WhoToFollow from "@/components/WhoToFollow";
import { CircleCheckBig } from "lucide-react";

export default function page() {
  return (
    <section className="grid grid-cols-12 w-full sm:pb-5 sm:pr-5 space-x-4">
      <div className="col-span-full lg:col-span-8 flex flex-col border-r">
        <div className="flex items-center justify-between pb-5 border-b">
          <h3 className="font-bold text-xl p-5">Notifications</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer pr-2 sm:pr-5">
            <CircleCheckBig className="w-5 h-5" />
            <span>Mark all as read</span>
          </div>
        </div>
        {/* <div className="max-w-[400px] mt-11 flex items-center justify-center self-center px-5">
          <p className="text-3xl">No notifications here — yet ...</p>
        </div> */}
        <div className="pt-0">
          <NotificationFollow />
          <NotificationVoted />
          <NotificationCmmented />
        </div>
      </div>
      <aside className="col-span-4 hidden lg:block mt-2">
        <WhoToFollow />
      </aside>
    </section>
  );
}
