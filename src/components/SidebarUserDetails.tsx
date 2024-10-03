// import { SignOutButton } from "@clerk/nextjs";
// import { Ellipsis, LogOut } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// export default function SidebarUserDetails({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <Popover>
//       <PopoverTrigger className="lg:w-full mt-auto">
//         <div className="self-center lg:self-start flex items-center lg:w-full justify-between mt-2 hover:bg-accent rounded-full lg:rounded-md cursor-pointer lg:p-2 text-accent-foreground">
//           {children}
//           <div className="hidden flex-col text-sm lg:flex">
//             <span>Moe Tarek</span>
//             <span className="text-muted-foreground">@moetarek</span>
//           </div>

//           <div className="hidden lg:block">
//             <Ellipsis />
//           </div>
//         </div>
//       </PopoverTrigger>
//       <PopoverContent
//         side="right"
//         className="w-fit cursor-pointer hover:bg-accent"
//       >
//         <div className="flex items-stretch justify-between">
//           <SignOutButton />
//           {/* <LogOut className="w-5 h-5" /> */}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
import { UserButton } from "@clerk/nextjs";
import { Ellipsis } from "lucide-react";

export default function SidebarUserDetails() {
  return (
    <div className="self-center relative lg:self-start flex items-center lg:w-full justify-between hover:bg-accent/40 hover:text-foreground rounded-full lg:rounded-md cursor-pointer lg:p-1 text-accent-foreground mt-auto">
      <span className="w-full lg:h-[60px]">
        <UserButton />
      </span>

      <div className="hidden text-sm lg:flex items-center gap-2 absolute right-[15px] z-[-1]">
        <div className="flex flex-col">
          <span>Moe Tarek</span>
          <span className="text-muted-foreground">@moetarek</span>
        </div>
        <div className="hidden lg:block">
          <Ellipsis />
        </div>
      </div>
    </div>
  );
}
