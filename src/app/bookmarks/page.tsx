import WhoToFollow from "@/components/WhoToFollow";
import { Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CaptionCard from "@/components/CaptionCard";
export default function page() {
  return (
    <section className="grid grid-cols-12 w-full sm:pb-5 sm:pr-5 space-x-4">
      <div className="col-span-full lg:col-span-8 flex flex-col border-r relative">
        <div className=" flex items-center justify-between p-5 pb-5 border-b sticky top-0 z-40 bg-card/30 backdrop-blur-md">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl ">Bookmarks</h3>
            <span className="text-muted-foreground text-sm">@moeTarek</span>
          </div>

          <Popover>
            <PopoverTrigger>
              <span>
                <Ellipsis />
              </span>
            </PopoverTrigger>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <PopoverContent className="w-fit hover:bg-muted cursor-pointer">
                  <span className="text-red-500 text-sm font-semibold ">
                    Clear All Bookmarks
                  </span>
                </PopoverContent>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all your bookmarks from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Popover>
        </div>
        {/* <div className="max-w-[400px] mt-11 flex items-center justify-center self-center px-5">
          <p className="text-3xl">No notifications here — yet ...</p>
        </div> */}
        <div>
          <CaptionCard rounded={false} singlePostMode={false} />
          <CaptionCard rounded={false} singlePostMode={false} />
          <CaptionCard rounded={false} singlePostMode={false} />
          <CaptionCard rounded={false} singlePostMode={false} />
          <CaptionCard rounded={false} singlePostMode={false} />
        </div>
      </div>

      <aside className="col-span-4 hidden lg:block mt-2">
        <WhoToFollow />
      </aside>
    </section>
  );
}
