"use client";
import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export default function DeletePostOption({
  userId,
  postId,
  setIsOpen,
}: {
  userId: string;
  postId: number;
  setIsOpen: any;
}) {
  const { toast } = useToast();
  async function handleDelete() {
    try {
      await deletePost(userId, postId);
      toast({
        description: "Your post has been deleted.",
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <li
        onClick={handleDelete}
        className="p-4 flex items-center gap-2 hover:bg-accent cursor-pointer text-destructive"
      >
        <Trash2 className="w-5 h-5" /> <span>Delete post</span>
      </li>
    </>
  );
}
