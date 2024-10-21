"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function FollowersAndFollowingNavbar() {
  const pathName = usePathname();
  const { userId } = useParams();

  return (
    <div className="h-10 mb-2 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
      <Link
        href={`/profile/${userId}/connections/followers`}
        className={`${
          pathName.includes("followers")
            ? "bg-background text-foreground shadow-sm"
            : ""
        } inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
      >
        Followers
      </Link>
      <Link
        href={`/profile/${userId}/connections/following`}
        className={`${
          pathName.includes("following")
            ? "bg-background text-foreground shadow-sm"
            : ""
        } inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
      >
        Following
      </Link>
    </div>
  );
}
