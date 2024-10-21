"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/lib/actions";
import { DialogClose } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Progress } from "@/components/ui/progress";

import { Textarea } from "./ui/textarea";
import { useUser } from "@clerk/nextjs";

export default function CreatePost({
  isBlurred,
  showSmallModal,
  userImage,
}: any) {
  const myUserId = useUser()?.user?.id;

  const [imageUrl, setImageUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [thereIsACaption, setThereIsACaption] = useState<boolean>(false);
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const caption = formData.get("caption") as string;
    const image = imageUrl;
    const isRepost = false;

    // Pass caption and imageUrl to the createPost action
    const postData = {
      caption,
      image,
      isRepost,
    };

    try {
      await createPost(postData);
      // Clear form after successful post creation
      setImageUrl(""); // Clear uploaded image
      (e.target as HTMLFormElement).reset();
      toast({
        description: "Your post has been created.",
        action: (
          <Link
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive"
            href={`/profile/${myUserId}`}
          >
            Show post
          </Link>
        ),
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      {!showSmallModal ? (
        <div className="w-full mt-2 hidden sm:block">
          <Dialog>
            <DialogTrigger asChild className="w-fit mx-auto lg:w-full">
              <Button
                title="Post"
                className="w-fit press-effect p-2 lg:w-full flex items-center justify-center rounded-full lg:rounded-md "
              >
                <span className="hidden lg:inline-block ">Post</span>
                <Pencil className="w-5 h-5 lg:hidden" />
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto sm:h-[80%] z-[99999]">
              <DialogHeader>
                <DialogTitle className="hidden">Create Post</DialogTitle>
                <DialogDescription className="hidden">
                  Create a post to reflect your ideas.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
                <div className="flex gap-3 border-b">
                  <div className="w-9 h-9 lg:w-10 lg:h-10">
                    <Avatar>
                      <AvatarImage src={userImage} alt="user image" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <Textarea
                    onChange={(e) => {
                      const characterCount = e.target.value.length as number;
                      const progressValue = (
                        (characterCount / 280) *
                        100
                      ).toFixed(1);

                      setProgress(Number(progressValue));

                      if (
                        e.target.value.length > 0 &&
                        e.target.value.length < 281
                      ) {
                        setThereIsACaption(true);
                      } else if (e.target.value.length > 281) {
                        setThereIsACaption(false);
                      } else {
                        setThereIsACaption(false);
                      }
                    }}
                    name="caption"
                    className="border-0 h-[120px] resize-none focus-visible:ring-0"
                    placeholder="What is on your mind?"
                  />
                </div>
                <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                <div
                  className={`${
                    progress > 100 ? "flex" : "hidden"
                  } bg-muted w-fit p-3 rounded-lg text-xs`}
                >
                  Maximum characters count is{"  "}
                  <span className="underline ms-1 cursor-default">280</span>.
                </div>
                <div className="self-end flex items-center gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="text-sm text-muted-foreground cursor-not-allowed">
                        Need inspiration?
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" className="w-fit text-xs">
                      <span>Coming soon </span>
                    </HoverCardContent>
                  </HoverCard>
                  <Progress max={200} value={progress} className="w-[40px]" />

                  <DialogClose disabled={!thereIsACaption}>
                    <Button disabled={!thereIsACaption}>Post</Button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="w-fit inline sm:hidden">
          <Dialog>
            <DialogTrigger
              asChild
              className={`w-fit fixed right-5 bottom-[66px] z-[9999] sm:hidden transition-opacity duration-300 ${
                isBlurred ? "opacity-50" : "opacity-100"
              }`}
            >
              <Button
                title="Post"
                className="w-fit press-effect p-2 flex items-center justify-center rounded-full"
              >
                <Pencil className="w-5 h-5 lg:hidden" />
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto sm:h-[80%] z-[99999]">
              <DialogHeader>
                <DialogTitle className="hidden">Create Post</DialogTitle>
                <DialogDescription className="hidden">
                  Create a post to reflect your ideas.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
                <div className="flex gap-3 border-b">
                  <div className="w-9 h-9 lg:w-10 lg:h-10">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="user image"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <Textarea
                    onChange={(e) => {
                      if (e.target.value.length > 0) {
                        setThereIsACaption(true);
                      } else {
                        setThereIsACaption(false);
                      }
                    }}
                    name="caption"
                    className="border-0 h-[120px] resize-none focus-visible:ring-0"
                    placeholder="What is on your mind?"
                  />
                </div>
                <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                <div className="self-end flex items-center gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="text-sm text-muted-foreground cursor-not-allowed">
                        Need inspiration?
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" className="w-fit text-xs">
                      <span>Coming soon </span>
                    </HoverCardContent>
                  </HoverCard>
                  <DialogClose disabled={!thereIsACaption}>
                    <Button disabled={!thereIsACaption}>Post</Button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
