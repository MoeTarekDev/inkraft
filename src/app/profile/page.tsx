import Image from "next/image";
import profileCover from "../../../public/profileCover.jpg";
// import placeHolderImage from "../../../public/placeHolderImage.jpg";
import CaptionCard from "@/components/CaptionCard";
import EditProfile from "@/components/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function page() {
  return (
    <section className="w-full flex flex-col items-center gap-10">
      <div className=" self-stretch">
        <div className="h-[200px] w-full relative">
          <Image
            src={profileCover}
            alt="Profile cover"
            fill
            className="object-cover"
          />
          <Avatar className="w-28 h-28  left-1/2 top-full -translate-y-1/2 -translate-x-1/2">
            <AvatarImage src="https://github.com/shadcn.png" alt="user image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-20 flex flex-col gap-2 items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">Moe Tarek</h2>
            <span className="text-muted-foreground text-sm">@moetarek</span>
          </div>
          <div className="max-w-[300px] sm:max-w-[400px]">
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, tenetur.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="user/followers"
              className="text-sm  hover:underline cursor-pointer"
            >
              <span className="font-semibold">
                1.25k <span className="text-muted-foreground">Followers</span>
              </span>
            </Link>
            <Link
              href="user/following"
              className="text-sm hover:underline cursor-pointer"
            >
              <span className="font-semibold">
                400 <span className="text-muted-foreground">Following</span>
              </span>
            </Link>
          </div>
          <div className="">
            <EditProfile />
          </div>
        </div>
      </div>

      <div className="self-stretch">
        <Tabs
          defaultValue="posts"
          className="w-full flex flex-col items-center pb-5"
        >
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent
            value="posts"
            className="w-full md:w-[80%] lg:w-[60%]  sm:px-5 "
          >
            <div className="w-full col-span-full text-center p-5 mt-3">
              <p>Nothing to show...yet! Posts you create will live here.</p>
            </div>
            {/* <div className="grid grid-cols-1 place-items-center">
              <CaptionCard rounded={false} />
              <CaptionCard rounded={false} />
              <CaptionCard rounded={false} />
              <CaptionCard rounded={false} />
            </div> */}
          </TabsContent>
          <TabsContent
            value="saved"
            className="w-full md:w-[80%] lg:w-[60%] sm:px-5"
          >
            <div className="grid grid-cols-1  place-items-center">
              <CaptionCard rounded={false} singlePostMode={false} />
              <CaptionCard rounded={false} singlePostMode={false} />
              <CaptionCard rounded={false} singlePostMode={false} />
              <CaptionCard rounded={false} singlePostMode={false} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
