"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircleMore } from "lucide-react";
import ReplyToPost from "./ReplyToPost";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getRelativeTime } from "@/lib/features";
import { useState } from "react";
export default function ReplyToPostDialog({
  bigPost,
  post,
  userId,
  userImage,
  singlePostMode,
  explicitPostId,
  receiverId,
}: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (singlePostMode) {
    return (
      <>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="block w-1/3 z-20 h-[42px] ">
            <div
              title="Comment"
              className="border press-effect h-full flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent cursor-pointer"
            >
              <MessageCircleMore className="w-5 h-5" />
              <span className="inline-block">{bigPost?.comments?.length}</span>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-card border-0">
            <DialogHeader className="hidden">
              <DialogTitle className="hidden">Reply to post</DialogTitle>
              <DialogDescription className="hidden">
                Add desired reply to the post.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              <div className="top-part flex gap-3">
                <div className="avatar w-fit h-fit relative before:absolute before:h-[45px] before:w-[2px] before:bg-muted before:top-[110%] before:left-1/2">
                  <Avatar>
                    <AvatarImage
                      src={bigPost?.post?.users?.imageUrl}
                      alt="user profile image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="other flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <div className="font-medium flex gap-1">
                      <span>{bigPost?.post?.users?.firstName}</span>
                      <span>{bigPost?.post?.users?.lastName}</span>
                    </div>
                    <span className="text-muted-foreground">
                      @{bigPost?.post?.users?.userName}
                    </span>
                    <span className="dot"></span>
                    <span className="text-muted-foreground line-clamp-1">
                      {getRelativeTime(bigPost?.post?.created_at)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm">{bigPost?.post?.caption}</p>
                  </div>
                  <div className="mt-3 text-sm cursor-default">
                    <span className="text-muted-foreground">Replying to</span>{" "}
                    <span className="text-primary">
                      @{bigPost?.post?.users?.userName}
                    </span>
                  </div>
                </div>
              </div>
              <ReplyToPost
                setIsDialogOpen={setIsDialogOpen}
                explicitPostId={null}
                singlePostMode={false}
                userId={userId}
                userImage={userImage}
                bigPost={bigPost}
                receiverId={receiverId}
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="block w-1/3 z-20  h-[42px]">
          <div
            title="Comment"
            className="border press-effect h-full flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent cursor-pointer"
          >
            <MessageCircleMore className="w-5 h-5" />
            <span className="inline-block">{post?.comments?.length}</span>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-card border-0">
          <DialogHeader className="hidden">
            <DialogTitle className="hidden">Reply to post</DialogTitle>
            <DialogDescription className="hidden">
              Add desired reply to the post.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <div className="top-part flex gap-3">
              <div className="avatar w-fit h-fit relative before:absolute before:h-[45px] before:w-[2px] before:bg-muted before:top-[110%] before:left-1/2">
                <Avatar>
                  <AvatarImage
                    src={post?.users?.imageUrl}
                    alt="user profile image"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="other flex flex-col gap-1">
                <div className="flex items-center gap-x-2 text-sm flex-wrap">
                  <div className="font-medium flex gap-1">
                    <span>{post?.users?.firstName}</span>
                    <span>{post?.users?.lastName}</span>
                  </div>
                  <span className="text-muted-foreground">
                    @{post?.users?.userName}
                  </span>
                  <span className="dot"></span>
                  <span className="text-muted-foreground">
                    {getRelativeTime(post?.created_at)}
                  </span>
                </div>
                <div>
                  <p className="text-sm">{post?.caption}</p>
                </div>
                <div className="mt-3 text-sm cursor-default">
                  <span className="text-muted-foreground">Replying to</span>{" "}
                  <span className="text-primary">@{post?.users?.userName}</span>
                </div>
              </div>
            </div>
            <ReplyToPost
              setIsDialogOpen={setIsDialogOpen}
              singlePostMode={false}
              explicitPostId={explicitPostId}
              userId={userId}
              userImage={userImage}
              bigPost={bigPost}
              receiverId={receiverId}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
