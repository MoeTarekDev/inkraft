"use client";

import { readAllNotifications } from "@/lib/actions";
import { CircleCheckBig } from "lucide-react";

export default function ReadAllNotifications({
  userId,
}: {
  userId: string | undefined;
}) {
  return (
    <div className="flex items-center justify-between pb-5 border-b">
      <h3 className="font-bold text-xl p-5">Notifications</h3>
      <div
        onClick={async () => {
          await readAllNotifications(userId);
        }}
        className="flex items-center gap-1 hover:text-primary text-sm text-muted-foreground cursor-pointer pr-2 sm:pr-5 press-effect"
      >
        <CircleCheckBig className="w-4 h-4" />
        <span>Mark all as read</span>
      </div>
    </div>
  );
}
