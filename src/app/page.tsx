import CaptionCard from "@/components/CaptionCard";
import WhoToFollow from "@/components/WhoToFollow";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();
  // console.log(auth());
  const user = await currentUser();
  console.log(user);

  return (
    <>
      <div className="grid grid-cols-12 w-full sm:p-5 space-x-4">
        <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center">
          {/* <h1 className="font-semibold text-3xl">Welcome to Inkraft</h1>
          <h2>Hello {userId}</h2>
          <h3>Nice to see you {user?.username}</h3>
          <UserButton />
          <SignOutButton /> */}
          <CaptionCard rounded={true} singlePostMode={false} />
          <CaptionCard rounded={true} singlePostMode={false} />
          <CaptionCard rounded={true} singlePostMode={false} />
          <CaptionCard rounded={true} singlePostMode={false} />
          <CaptionCard rounded={true} singlePostMode={false} />
        </div>
        <aside className="col-span-4 hidden lg:block">
          <WhoToFollow />
        </aside>
      </div>
    </>
  );
}
