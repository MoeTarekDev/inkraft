"use client";
import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteAllBookmarks } from "@/lib/users";

export default function DeleteAllBookmarks({ userId }: { userId: string }) {
  async function handleDelete() {
    deleteAllBookmarks(userId);
  }
  return (
    <Popover>
      <PopoverTrigger>
        <span>
          <Ellipsis />
        </span>
      </PopoverTrigger>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <PopoverContent className="w-fit hover:bg-muted cursor-pointer">
            <span className="text-red-500 text-sm font-semibold ">
              Clear All Bookmarks
            </span>
          </PopoverContent>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              your bookmarks from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Popover>
  );
}
