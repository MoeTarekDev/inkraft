import Image from "next/image";
import Link from "next/link";
import placeholder from "../../public/sunset.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function CaptionCardMini({
  singlePostMode,
}: {
  singlePostMode: boolean;
}) {
  if (singlePostMode)
    return (
      <article className="rounded-lg bg-card w-full flex gap-3 p-3 sm:p-5 h-fit ">
        <div className="w-full flex flex-col gap-3 flex-wrap">
          <div className="flex items-center gap-3 ">
            <Avatar className="w-9 h-9">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="user image"
                className="w-9 h-9 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2">
              <Link
                href="/profile"
                className="font-semibold hover:underline line-clamp-1 cursor-pointer"
              >
                Moe Tarek
              </Link>
              <Link
                href="/profile"
                className="text-muted-foreground line-clamp-1 cursor-pointer"
              >
                @moetarek
              </Link>
              <span className="text-muted-foreground text-xs text-center line-clamp-1">
                . Just now
              </span>
            </div>
          </div>
          <p className="ms-[37px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            officiis quod sed beatae neque minus quae fugiat exercitationem,
            eius architecto.
          </p>
        </div>
      </article>
    );
  return (
    <article className="rounded-lg bg-card w-full md:w-[90%] flex gap-3 p-3 sm:p-5 h-fit border-2">
      <div className="w-full flex flex-col gap-3 flex-wrap">
        <div className="flex items-center gap-3 ">
          <Avatar className="w-9 h-9">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="user image"
              className="w-9 h-9 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2">
            <Link
              href="/profile"
              className="font-semibold hover:underline line-clamp-1 cursor-pointer"
            >
              Moe Tarek
            </Link>
            <Link
              href="/profile"
              className="text-muted-foreground line-clamp-1 cursor-pointer"
            >
              @moetarek
            </Link>
            <span className="text-muted-foreground text-xs text-center line-clamp-1">
              . Just now
            </span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
          officiis quod sed beatae neque minus quae fugiat exercitationem, eius
          architecto.
        </p>
        <div className="relative w-full h-[300px] rounded-md">
          <Image
            src={placeholder}
            alt="post image"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </article>
  );
}
