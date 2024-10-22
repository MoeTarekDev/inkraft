import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function ProfilePageAvatarImage({ userBaseInfo }: any) {
  return (
    <Dialog>
      <DialogContent className="rounded-full w-48 h-48 sm:w-52 sm:h-52  md:w-80 md:h-80 p-0 bg-transparent border-0">
        <DialogHeader className="hidden">
          <DialogTitle>Profile image Dialog</DialogTitle>
          <DialogDescription>
            enlarging the profile image for a specific user
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full">
          <Avatar className="w-full h-full group-hover:scale-110 transition-transform duration-200">
            <AvatarImage
              src={userBaseInfo && userBaseInfo[0].imageUrl}
              alt="user image"
            />
            <AvatarFallback>
              {userBaseInfo &&
                userBaseInfo[0] &&
                userBaseInfo[0].firstName[0] + userBaseInfo[0].lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogContent>
      <DialogTrigger className="absolute z-20 rounded-full overflow-hidden group w-28 h-28 left-1/2 top-full -translate-y-1/2 -translate-x-1/2">
        <Avatar className="w-full h-full group-hover:scale-110 transition-transform duration-200">
          <AvatarImage
            src={userBaseInfo && userBaseInfo[0].imageUrl}
            alt="user image"
          />
          <AvatarFallback>
            {userBaseInfo &&
              userBaseInfo[0] &&
              userBaseInfo[0].firstName[0] + userBaseInfo[0].lastName[0]}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
    </Dialog>
  );
}
