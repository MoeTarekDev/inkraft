import ProfileCard from "./ProfileCard";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function UserAvatarWithHover() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="w-9 h-9 flex-shrink-0">
          <Avatar className="w-9 h-9">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="user image"
              className="w-full h-full rounded-full object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 cursor-default">
        <ProfileCard />
      </HoverCardContent>
    </HoverCard>
  );
}
