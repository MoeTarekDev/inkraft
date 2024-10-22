// "use client";
// import { ImagePlus, ImageUp, X } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { Button } from "./ui/button";

// export default function ProfilePageCoverImage({
//   userId,
//   userBaseInfo,
// }: {
//   userId: string;
//   userBaseInfo: any;
// }) {
//   const [value, setValue] = useState("");
//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const coverUrl = formData.get("coverUrl");
//     const coverData = {
//       coverUrl,
//       userId,
//     };
//     console.log(coverData);

//     await updateCoverImage(coverData);
//     setValue("");
//   }
//   return (
//     <form className="group w-full">
//       <div className="layer group-hover:flex group-hover:z-10 group-hover:opacity-100 hidden  absolute opacity-0 inset-0 bg-black/40 w-full h-full justify-center items-center gap-4 transition-opacity duration-300">
//         <div className="w-fit block">
//           {!value && (
//             <label
//               htmlFor="upload"
//               className="flex flex-col items-center gap-2 cursor-pointer"
//             >
//               <span className="p-3 bg-muted/80 hover:bg-muted rounded-full text-center cursor-pointer">
//                 <ImagePlus />
//               </span>
//             </label>
//           )}

//           <input
//             onChange={(e) => {
//               setValue(e.target.value);
//               console.log(e.target.value);
//             }}
//             name="coverUrl"
//             id="upload"
//             type="file"
//             className="hidden"
//           />
//         </div>

//         {value && (
//           <button
//             type="submit"
//             className="inline-block p-3 bg-muted/80 hover:bg-muted rounded-full text-center cursor-pointer"
//           >
//             <ImageUp />
//           </button>
//         )}

//         <span className="p-3 bg-muted/80 hover:bg-muted rounded-full text-center cursor-pointer">
//           <X />
//         </span>
//       </div>
//       <Image
//         quality={70}
//         src={userBaseInfo && userBaseInfo.length && userBaseInfo[0].coverUrl}
//         alt="Profile cover"
//         fill
//         className="object-cover"
//       />
//     </form>
//   );
// }

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
export default function ProfilePageCoverImage({
  userBaseInfo,
}: {
  userBaseInfo: any;
}) {
  return (
    <Dialog>
      <DialogContent className="w-full max-w-full max-h-[50%] sm:max-h-[80%] h-[80%] p-0 bg-transparent border-0">
        <DialogHeader className="hidden">
          <DialogTitle>Cover image Dialog</DialogTitle>
          <DialogDescription>
            enlarging the cover image for a specific user
          </DialogDescription>
        </DialogHeader>
        <Image
          quality={70}
          src={userBaseInfo && userBaseInfo.length && userBaseInfo[0].coverUrl}
          alt="Profile cover"
          fill
          className="object-cover"
        />
      </DialogContent>

      <DialogTrigger className="group w-full cursor-pointer">
        <div className="layer group-hover:flex group-hover:z-10 group-hover:opacity-100 hidden  absolute opacity-0 inset-0 bg-black/10 w-full h-full justify-center items-center gap-4 transition-opacity duration-300"></div>
        <Image
          quality={70}
          src={userBaseInfo && userBaseInfo.length && userBaseInfo[0].coverUrl}
          alt="Profile cover"
          fill
          className="object-cover"
        />
      </DialogTrigger>
    </Dialog>
  );
}
