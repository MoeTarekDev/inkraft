import NotificationsAsyncPart from "@/components/NotificationsAsyncPart";
import ReadAllNotifications from "@/components/ReadAllNotifications";
import ShowWhoToFollowLayout from "@/components/ShowWhoToFollowLayout";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function page() {
  const info = await currentUser();

  return (
    <>
      <ShowWhoToFollowLayout
        showWhoToFollow={true}
        className={"sm:ps-0 sm:pt-0 sm:pe-5 p-0 mt-[81px]"}
      >
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
