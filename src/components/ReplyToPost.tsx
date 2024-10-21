"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { addComment } from "@/lib/actions";
export default function ReplyToPost({
  singlePostMode,
  userId,
  explicitPostId,
  userImage,
  bigPost,
}: {
  singlePostMode: boolean;
  explicitPostId: string | null;
  userId: string;
  userImage: string;
  bigPost: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content") as string;
    const postId = bigPost?.post?.id ?? explicitPostId;
    const commentData = {
      content,
      userId,
      postId,
    };

    await addComment(commentData);
    (e.target as HTMLFormElement).reset();
    setValue("");
  }
  if (singlePostMode) {
    return (
      <>
        <Collapsible
          open={isOpen}
          onOpenChange={() => {
            setIsOpen(true);
          }}
          className="pb-5 pt-2 border-b"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <CollapsibleContent className="space-y-2 ms-[calc(36px+12px+8px)] cursor-default CollapsibleContent ">
              <span className="text-muted-foreground text-sm ">
                Replying to
              </span>{" "}
              <span className="text-primary">
                @{bigPost?.post?.users?.userName}
              </span>
            </CollapsibleContent>

            <CollapsibleTrigger asChild>
              <div className="flex items-center gap-2 relative">
                <Link
                  href={`/profile/${userId}`}
                  className="w-9 h-9 flex-shrink-0"
                >
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src={userImage}
                      alt="user image"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <Input
                  name="content"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  type="text"
                  placeholder="Post your reply"
                  className="ring-0 focus-visible:ring-0 border-0 text-base"
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="self-end CollapsibleContent">
              <Button disabled={value.length > 0 ? false : true}>Reply</Button>
            </CollapsibleContent>
          </form>
        </Collapsible>
      </>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2 relative">
          <Link href={`/profile/${userId}`} className="w-9 h-9 flex-shrink-0">
            <Avatar className="w-9 h-9">
              <AvatarImage
                src={userImage}
                alt="user image"
                className="w-full h-full rounded-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <Input
            name="content"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
            placeholder="Post your reply"
            className="ring-0 focus-visible:ring-0 border-0 text-base"
          />
        </div>
        <div className="self-end">
          <Button disabled={value.length > 0 ? false : true}>Reply</Button>
        </div>
      </form>
    </>
  );
}
