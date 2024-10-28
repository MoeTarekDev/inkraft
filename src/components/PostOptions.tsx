"use client";
import { CircleEllipsis } from "lucide-react";
import { useEffect, useState } from "react";
import BookmarkOption from "./BookmarkOption";
import CopyOption from "./CopyOption";
import DeletePostOption from "./DeletePostOption";
import FollowOption from "./FollowOption";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function PostOptions({
  loggedInUserFollowedUsers,
  userId,
  user,
  postId,
  post,
  isPostBookmarkedByUser,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [postLink, setPostLink] = useState<string>("");
  useEffect(() => {
    // This will run only on the client-side
    if (typeof window !== "undefined") {
      setPostLink(`${window.location.host}/${user.userName}/status/${post.id}`);
    }
  }, [user.userName, post.id]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        title="More"
        className="cursor-pointer hover:bg-accent p-2 rounded-full press-effect z-20"
      >
        <CircleEllipsis />
      </PopoverTrigger>
      <PopoverContent side="top" className="p-0">
        <ul className="flex flex-col text-sm">
          {userId === user?.clerkUserId ? (
            <DeletePostOption
              userId={userId}
              postId={postId}
              setIsOpen={setIsOpen}
            />
          ) : (
            <FollowOption
              user={user}
              followerId={userId}
              followedId={user.clerkUserId}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              setIsOpen={setIsOpen}
            />
          )}
          <CopyOption postLink={postLink} setIsOpen={setIsOpen} />
          {/* <SharePostOption postContent={post?.caption} postLink={postLink} /> */}
          <BookmarkOption
            userId={userId}
            postId={postId}
            isPostBookmarkedByUser={isPostBookmarkedByUser}
            setIsOpen={setIsOpen}
          />
        </ul>
      </PopoverContent>
    </Popover>
  );
}
