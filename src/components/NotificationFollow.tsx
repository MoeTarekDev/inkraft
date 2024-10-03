import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";

export default function NotificationFollow() {
  return (
    <div className="flex gap-3 items-center hover:bg-accent p-5 cursor-pointer caption-card-notification border-b">
      <div>
        <User className="fill-primary" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="w-full flex items-center gap-3">
          <UserAvatarWithHover />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm flex-wrap">
              <UserNameWithHover />
              <span className="text-muted-foreground">followed you</span>
            </div>
            <span className="text-xs text-muted-foreground">1 hour ago</span>
          </div>
        </div>
        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
      </div>
    </div>
  );
}
