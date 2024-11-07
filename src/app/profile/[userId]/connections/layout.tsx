import FollowersAndFollowingNavbar from "@/components/FollowersAndFollowingNavbar";
import ShowWhoToFollowLayout from "@/components/ShowWhoToFollowLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/users";
import { Suspense } from "react";

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { userId } = params;

  return (
    <>
      <ShowWhoToFollowLayout className={"h-full"} showWhoToFollow={true}>
        <div className="col-span-full lg:col-span-8 flex flex-col items-center relative border-r h-full">
          <div className=" border-b w-full sticky p-2 left-0 right-0 top-0 backdrop-blur-md bg-card/3 z-[50]">
            <Suspense fallback={<UserInfoSkeleton />}>
              <UserInfo userId={userId} />
            </Suspense>
            <FollowersAndFollowingNavbar />
          </div>
          <div className="self-stretch flex flex-col items-stretch">
            {children}
          </div>
        </div>
      </ShowWhoToFollowLayout>
    </>
  );
}

async function UserInfo({ userId }: { userId: string }) {
  const info = await getUser(userId);

  return (
    <div className="flex flex-col p-2 sm:p-2 sm:pb-4 ">
      <h3 className="font-bold text-xl">
        {info && info.length && info[0].firstName}{" "}
        {info && info.length && info[0].lastName}
      </h3>
      <span className="text-muted-foreground text-sm">
        @{info && info[0] && info[0].userName}
      </span>
    </div>
  );
}
async function UserInfoSkeleton() {
  return (
    <div className="flex flex-col p-2 sm:p-2 sm:pb-4 gap-1">
      <Skeleton className="w-[200px] h-4" />
      <Skeleton className="w-[150px] h-4" />
    </div>
  );
}
