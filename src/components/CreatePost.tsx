import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CreatePost() {
  return (
    <form className="flex flex-col gap-3 ">
      <div className="flex gap-3 border-b">
        <div className="w-9 h-9 lg:w-10 lg:h-10">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="user image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Textarea
          className="border-0 h-[120px] resize-none focus-visible:ring-0"
          placeholder="What is on your mind?"
        />
      </div>
      <div className="bg-muted w-full h-[320px] rounded-md"></div>
      <Button className="self-end" disabled>
        Post
      </Button>
    </form>
  );
}
