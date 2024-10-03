import Image from "next/image";
import profileCover from "../../public/profileCover.jpg";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ImagePlus, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:h-[80%] h-fit overflow-y-auto">
        <DialogHeader className="h-fit">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form action="" className="flex flex-col">
          <div className="h-[200px] w-full relative">
            <div className="relative w-full h-full">
              <Image
                src={profileCover}
                alt="Profile cover"
                fill
                className="object-cover"
              />
              <div className="layer absolute inset-0 bg-black/40 w-full h-full flex justify-center items-center gap-4">
                <span className="p-3 bg-muted/50 hover:bg-muted/40 rounded-full text-center cursor-pointer">
                  <ImagePlus />
                </span>
                <span className="p-3 bg-muted/50 hover:bg-muted/40 rounded-full text-center cursor-pointer">
                  <X />
                </span>
              </div>
            </div>
            <div className="left-4 top-full w-24 h-24 -translate-y-1/2  absolute">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="user image"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="layer absolute inset-0 bg-black/40 w-full h-full flex justify-center items-center rounded-full">
                <span className="p-3 bg-muted/50 hover:bg-muted/40 rounded-full text-center cursor-pointer">
                  <ImagePlus />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-20 flex flex-col gap-3">
            <div>
              <Label htmlFor="userName">Name</Label>
              <Input
                id="userName"
                className="mt-1"
                type="text"
                placeholder="Enter your name"
                defaultValue={"Mohamed Tarek"}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>

              <Textarea
                id="bio"
                placeholder="Enter your bio"
                className="resize-none h-[150px] overflow-y-auto"
                defaultValue={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Exercitationem, tenetur."
                }
              />
            </div>
          </div>
          <Button className="self-end mt-3">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
