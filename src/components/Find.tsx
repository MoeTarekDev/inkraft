import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import FollowUser from "./FollowUser";

export default function Find() {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <li
          title="Find"
          className="p-2 lg:p-3 w-fit mx-auto hover:bg-accent text-accent-foreground rounded-full lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer"
        >
          <div className="flex lg:p-0 justify-center lg:justify-start items-center gap-0 lg:gap-4">
            <Search className="lg:w-5 lg:h-5 w-6 h-6" />
            <span className="hidden lg:inline-block">Find</span>
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90%] md:h-[382px] overflow-y-scroll p-1">
        <DialogHeader>
          <DialogTitle className="hidden">Find people</DialogTitle>
          <DialogDescription className="hidden">
            Search people to grow your connections
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="absolute top-0 left-0 right-0 flex items-center p-3 pt-2 pe-6 border-b">
            <Search className="w-4 h-4  text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search People"
              autoFocus={true}
              className="border-0 focus-visible:ring-0 shadow-none rounded-none"
            />
          </div>
          <div className="mt-16">
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
            <FollowUser showFollowButton={false} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
