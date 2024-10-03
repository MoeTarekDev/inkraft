import Link from "next/link";
import FollowUser from "./FollowUser";

export default function WhoToFollow() {
  return (
    <div className="rounded-lg bg-card flex flex-col  h-fit border-2">
      <h2 className="font-bold text-lg p-3 "> Who to follow</h2>
      <div>
        <FollowUser showFollowButton={true} />
        <FollowUser showFollowButton={true} />
        <FollowUser showFollowButton={true} />
      </div>
      <Link className="p-3 block text-sm hover:bg-accent" href="/suggested">
        Show more
      </Link>
    </div>
  );
}
