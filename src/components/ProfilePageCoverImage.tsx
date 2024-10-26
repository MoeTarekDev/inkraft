import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import defaultCover from "../../public/default-cover.webp";
export default function ProfilePageCoverImage({}) {
  return (
    <Dialog>
      <DialogContent className="w-full max-w-full max-h-[50%] sm:max-h-[80%] h-[80%] p-0 bg-transparent border-0">
        <DialogHeader className="hidden">
          <DialogTitle>Cover image Dialog</DialogTitle>
          <DialogDescription>
            enlarging the cover image for a specific user
          </DialogDescription>
        </DialogHeader>
        <Image
          quality={70}
          src={defaultCover}
          alt="Profile cover"
          fill
          className="object-cover"
        />
      </DialogContent>

      <DialogTrigger className="group w-full cursor-pointer">
        <div className="layer group-hover:flex group-hover:z-10 group-hover:opacity-100 hidden  absolute opacity-0 inset-0 bg-black/10 w-full h-full justify-center items-center gap-4 transition-opacity duration-300"></div>
        <Image
          quality={70}
          src={defaultCover}
          alt="Profile cover"
          fill
          className="object-cover"
        />
      </DialogTrigger>
    </Dialog>
  );
}
