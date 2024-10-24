"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image"; // Next.js Image component
import React, { useState, useEffect } from "react";

export default function CaptionCardImage({ postImage }: any) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // Use the native browser Image constructor to load the image and get its natural dimensions
  useEffect(() => {
    const img = new window.Image(); // Use the native Image constructor
    img.src = postImage;
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      setAspectRatio(ratio);
    };
  }, [postImage]);

  return (
    <Dialog>
      <DialogContent className="flex justify-center items-center pb-0 max-w-[800px] border-0 p-0">
        <DialogHeader className="hidden">
          <DialogTitle>Post image</DialogTitle>
          <DialogDescription>Enlarged version of post image</DialogDescription>
        </DialogHeader>
        <div
          className="relative w-full overflow-hidden"
          style={{
            paddingBottom: aspectRatio ? `${100 / aspectRatio}%` : "56.25%", // Fallback to 16:9 if aspect ratio is not yet determined
          }}
        >
          <Image
            src={postImage}
            alt="post image"
            fill
            className="object-contain rounded-lg" // Use object-contain to ensure no part of the image is cropped
          />
        </div>
      </DialogContent>
      <DialogTrigger className="relative w-full h-fit rounded-lg overflow-hidden z-20">
        <div
          className="relative w-full h-0"
          style={{
            paddingBottom: aspectRatio ? `${100 / aspectRatio}%` : "56.25%", // Same dynamic aspect ratio handling
          }}
        >
          <Image
            src={postImage}
            alt="post thumbnail"
            fill
            className="object-cover rounded-lg" // Use object-cover for the thumbnail
          />
        </div>
      </DialogTrigger>
    </Dialog>
  );
}
