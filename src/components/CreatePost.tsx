"use client";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/lib/actions";
import { DialogClose } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
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
import { Textarea } from "./ui/textarea";

export default function CreatePost() {
  const [imageUrl, setImageUrl] = useState<string>("");
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
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-fit lg:w-full">
        <Button
          title="Post"
          className="w-fit press-effect p-2 lg:w-full lg:mt-2 flex items-center justify-center rounded-full lg:rounded-md "
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
          <DialogClose className="self-end">
            <Button asChild disabled={!thereIsACaption}>
              Post
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
