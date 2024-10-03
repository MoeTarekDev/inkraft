import ProfileCard from "./ProfileCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function UserNameWithHover() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="font-semibold hover:underline line-clamp-1">
          Moe Tarek
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 cursor-default">
        <ProfileCard />
      </HoverCardContent>
    </HoverCard>
  );
}
