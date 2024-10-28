"use client";

import { useToast } from "@/hooks/use-toast";
import { readAllNotifications } from "@/lib/actions";
import { CircleCheckBig } from "lucide-react";

export default function ReadAllNotifications({
  userId,
}: {
  userId: string | undefined;
}) {
  const { toast } = useToast();
  async function handleRead() {
    try {
      await readAllNotifications(userId);
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  }
  return (
    <div className="flex items-center justify-between pb-5 border-b w-full border-r">
      <h3 className="font-bold text-xl p-5">Notifications</h3>
      <div
        onClick={handleRead}
        className="flex items-center gap-1 hover:text-primary text-sm text-muted-foreground cursor-pointer pr-3 sm:pr-5 press-effect"
      >
        <CircleCheckBig className="w-4 h-4" />
        <span>Mark all as read</span>
      </div>
    </div>
  );
}
