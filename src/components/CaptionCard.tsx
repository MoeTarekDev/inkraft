import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  CircleEllipsis,
  Link as LinkIcon,
  MessageCircleMore,
  RefreshCcw,
  Twitter,
  UserRoundPlus,
} from "lucide-react";
import Image from "next/image";
import placeholder from "../../public/sunset.jpg";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import UserUserNameWithHover from "./UserUserNameWithHover";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import CaptionCardMini from "./CaptionCardMini";

export default function CaptionCard({
  rounded,
  singlePostMode,
}: {
  rounded: boolean;
  singlePostMode: boolean;
}) {
  if (singlePostMode)
    return (
      <article
        className={`${
          rounded
            ? "caption-card-rounded sm:rounded-lg w-full md:w-[90%] p-3 sm:p-5 sm:border-2"
            : "w-full p-3 sm:p-5 caption-card-not-rounded"
        }  bg-card  h-fit border-b-2`}
      >
        <div className="w-full flex flex-col gap-2 flex-wrap">
          <div className="flex items-center gap-3 ">
            <UserAvatarWithHover />
            <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2 flex-wrap">
              <UserNameWithHover />
              <UserUserNameWithHover />

              <span className="text-muted-foreground text-xs text-center line-clamp-1">
                . Just now
              </span>
            </div>
          </div>
          <p className="text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            officiis quod sed beatae neque minus quae fugiat exercitationem,
            eius architecto.
          </p>
          <div className="relative w-full h-[450px] rounded-md">
            <Image
              src={placeholder}
              alt="post image"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex items-center justify-between text-xs gap-1 sm:gap-3 mt-2 pb-3 border-b">
            <div
              title="Vote"
              className="border flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent"
            >
              <ChevronUp className="hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer" />{" "}
              <span className="cursor-default hidden sm:inline-block">
                15.9k
              </span>
              <ChevronDown className="hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer" />
            </div>
            <div
              title="Repost"
              className="border press-effect h-full flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent cursor-pointer"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className=" hidden sm:inline-block"> Repost</span>
            </div>
            <div
              title="Comment"
              className="border press-effect h-full flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent cursor-pointer"
            >
              <MessageCircleMore className="w-5 h-5" />
              <span className="hidden sm:inline-block">1.5k</span>
            </div>
            <Popover>
              <PopoverTrigger
                title="More"
                className="cursor-pointer hover:bg-accent p-2 rounded-full press-effect"
              >
                <CircleEllipsis />
              </PopoverTrigger>
              <PopoverContent side="top" className="p-0">
                <ul className="flex flex-col text-sm">
                  <li className="p-4 flex items-center gap-2 hover:bg-accent rounded-t-md cursor-pointer">
                    <UserRoundPlus className="w-5 h-5" />
                    <span>Add @moetarek</span>
                  </li>
                  <li className="p-4 flex items-center gap-2 hover:bg-accent cursor-pointer">
                    <LinkIcon className="w-5 h-5" />
                    <span>Copy to Clipboard</span>
                  </li>
                  <li className="p-4 flex items-center gap-2 hover:bg-accent cursor-pointer">
                    <Twitter />
                    <span>Share post to Twitter</span>
                  </li>
                  <li className="p-4 flex items-center gap-2 hover:bg-accent rounded-b-md cursor-pointer">
                    <Bookmark className="w-5 h-5" />{" "}
                    <span>Add to Bookmarks</span>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <form className="flex flex-col gap-3 mt-3 pb-3 border-b">
            <div className="flex items-center gap-2">
              <Link href="/profile" className="w-9 h-9 flex-shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="user image"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <Input
                type="text"
                placeholder="Post your reply"
                className="ring-0 focus-visible:ring-0 border-0  h-fit"
              />
            </div>
            <Button className="self-end">Post</Button>
          </form>
          <div>
            <CaptionCardMini singlePostMode={true} />
            <CaptionCardMini singlePostMode={true} />
            <CaptionCardMini singlePostMode={true} />
            <CaptionCardMini singlePostMode={true} />
          </div>
        </div>
      </article>
    );
  return (
    <article
      className={`${
        rounded
          ? "caption-card-rounded sm:rounded-lg w-full md:w-[90%] p-3 sm:p-5 sm:border-2"
          : "w-full p-3 sm:p-5 caption-card-not-rounded"
      }  bg-card   h-fit border-b-2 hover:bg-muted/20 `}
    >
      <Link href="status/placeholderlink" className=" w-full flex gap-3">
        <UserAvatarWithHover />

        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2 flex-wrap">
              <UserNameWithHover />
              <UserUserNameWithHover />

              <span className="text-muted-foreground text-xs text-center line-clamp-1">
                . Just now
              </span>
            </div>
          </div>
          <p className="text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            officiis quod sed beatae neque minus quae fugiat exercitationem,
            eius architecto.
          </p>
          <div className="relative w-full h-[300px] rounded-md">
            <Image
              src={placeholder}
              alt="post image"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex items-center justify-between text-xs gap-1 sm:gap-3 mt-2">
            <div
              title="Vote"
              className="border flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent"
            >
              <ChevronUp className="hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer" />{" "}
              <span className="cursor-default hidden sm:inline-block">
                15.9k
              </span>
              <ChevronDown className="hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer" />
            </div>
            <div
              title="Repost"
              className="border press-effect h-full flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent cursor-pointer"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className=" hidden sm:inline-block"> Repost</span>
            </div>
            <div
              title="Comment"
              className="border press-effect h-full flex items-center gap-1 p-2 flex-1 justify-center rounded-md hover:bg-accent cursor-pointer"
            >
              <MessageCircleMore className="w-5 h-5" />
              <span className="hidden sm:inline-block">1.5k</span>
            </div>
            <Popover>
              <PopoverTrigger
                title="More"
                className="cursor-pointer hover:bg-accent p-2 rounded-full press-effect"
              >
                <CircleEllipsis />
              </PopoverTrigger>
              <PopoverContent side="top" className="p-0">
                <ul className="flex flex-col text-sm">
                  <li className="p-4 flex items-center gap-2 hover:bg-accent rounded-t-md cursor-pointer">
                    <UserRoundPlus className="w-5 h-5" />
                    <span>Add @moetarek</span>
                  </li>
                  <li className="p-4 flex items-center gap-2 hover:bg-accent cursor-pointer">
                    <LinkIcon className="w-5 h-5" />
                    <span>Copy to Clipboard</span>
                  </li>
                  <li className="p-4 flex items-center gap-2 hover:bg-accent cursor-pointer">
                    <Twitter />
                    <span>Share post to Twitter</span>
                  </li>
                  <li className="p-4 flex items-center gap-2 hover:bg-accent rounded-b-md cursor-pointer">
                    <Bookmark className="w-5 h-5" />{" "}
                    <span>Add to Bookmarks</span>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Link>
    </article>
  );
}
