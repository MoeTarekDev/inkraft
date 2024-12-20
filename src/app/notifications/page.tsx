import NotificationsAsyncPart from "@/components/NotificationsAsyncPart";
import ReadAllNotifications from "@/components/ReadAllNotifications";
import ShowWhoToFollowLayout from "@/components/ShowWhoToFollowLayout";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Notifications",
};

export default async function page() {
  const info = await currentUser();

  return (
    <>
      <ShowWhoToFollowLayout showWhoToFollow={true} className={"mt-[81px]"}>
        <div className="col-span-full lg:col-span-8 flex flex-col items-center w-full">
          <ReadAllNotifications userId={info?.id} />
          <Suspense fallback={<div className="loader self-center"></div>}>
            <NotificationsAsyncPart info={info} />
          </Suspense>
        </div>
      </ShowWhoToFollowLayout>
    </>
  );
}
