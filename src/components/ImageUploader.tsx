import { UploadDropzone } from "@uploadthing/react";
import Image from "next/image";
interface ImageUploaderProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}
export default function ImageUploader({
  imageUrl,
  setImageUrl,
}: ImageUploaderProps) {
  return (
    <div>
      {imageUrl.length ? (
        <div className="bg-muted w-full flex items-center justify-center h-[320px] rounded-md relative">
          <span className="loader"></span>

          <Image
            className="object-cover rounded-md z-20"
            src={imageUrl}
            alt="post image"
            fill
            sizes="w-full h-[320px]"
          />
        </div>
      ) : (
        //@ts-expect-error
        <UploadDropzone
          endpoint="imageUploader"
          appearance={{
            button: "bg-primary text-primary-foreground",
            container: "bg-muted w-full h-[320px] rounded-md",
            label: "hover:text-primary",
          }}
          onClientUploadComplete={(res: any) => {
            // Do something with the response
            console.log("Files: ", res);
            setImageUrl(res[0].appUrl);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}
