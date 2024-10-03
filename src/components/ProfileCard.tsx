import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function ProfileCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href="/profile">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="user image"
                className="w-9 h-9 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex flex-col text-xs ">
              <Link href="/profile" className="font-semibold hover:underline">
                Moe Tarek
              </Link>
              <Link href="/profile" className="text-muted-foreground">
                @moetarek
              </Link>
            </div>
          </div>
        </div>
        <Button className={"inline-block text-xs cursor-pointer py-1 px-4"}>
          Follow
        </Button>
      </div>
      <p className="w-fit text-sm ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ut
        illum nostrum numquam fugiat eum.
      </p>
      <div className="flex items-center gap-2">
        <div className="text-sm  hover:underline cursor-pointer">
          <span className="font-semibold">
            1.25k <span className="text-muted-foreground">Followers</span>
          </span>
        </div>
        <div className="text-sm hover:underline cursor-pointer">
          <span className="font-semibold">
            400 <span className="text-muted-foreground">Following</span>
          </span>
        </div>
      </div>
    </div>
  );
}
