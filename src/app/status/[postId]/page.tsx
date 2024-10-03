import CaptionCard from "@/components/CaptionCard";
import WhoToFollow from "@/components/WhoToFollow";

export default function page() {
  return (
    <div className="grid grid-cols-12 w-full sm:p-5 sm:ps-0 sm:pt-0 space-x-4 ">
      <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center border-r">
        {/* <h1 className="font-semibold text-3xl">Welcome to Inkraft</h1>
          <h2>Hello {userId}</h2>
          <h3>Nice to see you {user?.username}</h3>
          <UserButton />
          <SignOutButton /> */}
        <CaptionCard rounded={false} singlePostMode={true} />
      </div>
      <aside className="col-span-4 hidden lg:block">
        <WhoToFollow />
      </aside>
    </div>
  );
}
