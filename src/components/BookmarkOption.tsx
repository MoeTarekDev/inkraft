import { useToast } from "@/hooks/use-toast";
import { addToBookmarks, removeFromBookmarks } from "@/lib/actions";
import { Bookmark } from "lucide-react";

export default function BookmarkOption({
  userId,
  postId,
  isPostBookmarkedByUser,
  setIsOpen,
}: {
  userId: string;
  postId: number;
  isPostBookmarkedByUser: boolean;
  setIsOpen: any;
}) {
  const { toast } = useToast();
  async function handleAddBookmark() {
    try {
      setIsOpen(false);
      await addToBookmarks(userId, postId);
      toast({
        description: "Post added to Bookmarks.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  }
  async function handleRemoveBookmark() {
    try {
      setIsOpen(false);
      await removeFromBookmarks(userId, postId);
      toast({
        description: "Post removed from Bookmarks.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  }

  return (
    <>
      {isPostBookmarkedByUser ? (
        <li
          onClick={handleRemoveBookmark}
          className="p-4 flex items-center gap-2 hover:bg-accent rounded-b-md cursor-pointer"
        >
          <Bookmark className="w-5 h-5 fill-primary" />
          <span>Remove from Bookmarks</span>
        </li>
      ) : (
        <li
          onClick={handleAddBookmark}
          className="p-4 flex items-center gap-2 hover:bg-accent rounded-b-md cursor-pointer"
        >
          <Bookmark className="w-5 h-5" />
          <span>Add to Bookmarks</span>
        </li>
      )}
    </>
  );
}
