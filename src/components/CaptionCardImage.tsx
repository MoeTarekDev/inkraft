import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function CaptionCardImage({ children }: any) {
  return (
    <Dialog>
      <DialogContent className="flex justify-center items-center pb-0 max-w-[800px] border-0 p-0">
        <DialogHeader className="hidden">
          <DialogTitle>Post image</DialogTitle>
          <DialogDescription>enlarge version of post image</DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
          {children}
        </div>
      </DialogContent>
      <DialogTrigger>
        <div>
          <div className="relative w-full h-[400px] pb-[56.25%] rounded-lg overflow-hidden z-20">
            {children}
          </div>
        </div>
      </DialogTrigger>
    </Dialog>
  );
}
