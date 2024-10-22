"use client";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/lib/types";
import { repostPost, undoRepostPost } from "@/lib/users";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RepostPost({
  originalPostId,
  repostingUserId,
  userId,
  isRepostedByUser,
  post,
}: {
  originalPostId: any;
  repostingUserId: string;
  userId: string;
  post: Post;
  isRepostedByUser: boolean;
}) {
  const [didUserRepost, setDidUserRepost] = useState(false);
  const { toast } = useToast();
  async function handleSubmit() {
    try {
      await repostPost(originalPostId, repostingUserId);
      toast({
        description: "Post has been reposted.",
        action: (
          <Link
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive"
            href={`/profile/${repostingUserId}`}
          >
            Show post
          </Link>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUndoSubmit() {
    try {
      await undoRepostPost(userId, originalPostId);
      toast({
        description: "Post has been UnReposted.",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setDidUserRepost(
      post.isRepost && post.userId === userId
        ? true
        : post.isRepostedByUser || isRepostedByUser
    );
  }, [post, isRepostedByUser, userId]);
  return (
    <>
      {!didUserRepost ? (
        <div
          onClick={handleSubmit}
          title="Repost"
          className="border press-effect h-[42px] flex items-center gap-1 p-2 w-1/3 justify-center rounded-md hover:bg-accent cursor-pointer z-20"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className=" hidden sm:inline-block"> Repost</span>
        </div>
      ) : (
        <div
          onClick={handleUndoSubmit}
          title="Repost"
          className="border press-effect self-stretch h-[42px] bg-primary text-primary-foreground  flex items-center gap-1 p-2 w-1/3 justify-center rounded-md hover:bg-primary/80 cursor-pointer z-20"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className=" hidden sm:inline-block"> undo Repost</span>
        </div>
      )}
    </>
  );
}
