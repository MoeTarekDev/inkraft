import ProfileCard from "./ProfileCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function UserUserNameWithHover() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-muted-foreground line-clamp-1">@moetarek</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 cursor-default">
        <ProfileCard />
      </HoverCardContent>
    </HoverCard>
  );
}
