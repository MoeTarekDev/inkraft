import CaptionCard from "@/components/CaptionCard";
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
} from "@/components/ui/alert-dialog";
import WhoToFollow from "@/components/WhoToFollow";
import { Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { getFollowedUsers, getUserBookmarkedPosts } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { Post } from "@/lib/types";
import DeleteAllBookmarks from "@/components/DeleteAllBookmarks";
export default async function page() {
  const info: any = await currentUser();
  const bookmarkedPosts: any = await getUserBookmarkedPosts(info?.id);
  const loggedInUserFollowedUsers = await getFollowedUsers(info?.id);

  return (
    <section className="grid grid-cols-12 w-full sm:pr-5 space-x-4 self-start h-full">
      <div className="col-span-full lg:col-span-8 flex flex-col border-r relative">
        <div className=" flex items-center justify-between p-5 pb-5 border-b sticky top-0 z-40 bg-card/30 backdrop-blur-md">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">Bookmarks</h3>
            <span className="text-muted-foreground text-sm">
              @{info?.username}
            </span>
          </div>
          <DeleteAllBookmarks userId={info?.id} />
        </div>
        {bookmarkedPosts ? (
          <div>
            {bookmarkedPosts.map((post: Post) => (
              <CaptionCard
                personalInfo={null}
                bigPost={null}
                key={post.id}
                userId={info?.id}
                userImage={info?.imageUrl}
                post={post}
                rounded={false}
                singlePostMode={false}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-[400px] mt-11 flex items-center justify-center self-center px-5">
            <p className="text-3xl">No Bookmarks here — yet ...</p>
          </div>
        )}
      </div>

      <aside className="col-span-4 hidden lg:block mt-2">
        <WhoToFollow />
      </aside>
    </section>
  );
}
