import { MessageCircle } from "lucide-react";
import CaptionCardMini from "./CaptionCardMini";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";

export default function NotificationCmmented() {
  return (
    <div className="flex flex-col gap-5 items-center hover:bg-accent p-5 cursor-pointer caption-card-notification border-b">
      <div className="flex items-center gap-3 justify-between w-full">
        <div>
          <MessageCircle className="fill-primary" />
        </div>
        <div className="w-full flex items-center gap-3">
          <UserAvatarWithHover />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm flex-wrap">
              <UserNameWithHover />
              <span className="text-muted-foreground">
                commented on your post
              </span>
            </div>
            <span className="text-xs text-muted-foreground">23 hour ago</span>
          </div>
        </div>
        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
      </div>

      <CaptionCardMini singlePostMode={false} />
    </div>
  );
}
