// "use client";
// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Textarea } from "./ui/textarea";
// export default function EditBio({ userBaseInfo }: any) {
//   const [open, setIsOpen] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   console.log(showForm);

//   return (
//     <>
//       <Collapsible>
//         <form action="" className="max-w-[300px] sm:w-[500px] text-center">
//           <p className={`${showForm ? "hidden" : "block"} text-center`}>
//             {userBaseInfo && userBaseInfo.length > 0 ? userBaseInfo[0].bio : ""}
//           </p>
//           <CollapsibleContent
//             className={`${showForm ? "flex" : "hidden"}  flex-col gap-1`}
//           >
//             <Textarea
//               className={`resize-none w-full`}
//               defaultValue={
//                 userBaseInfo && userBaseInfo.length > 0 && userBaseInfo[0].bio
//               }
//             />
//             <div className={`flex items-center gap-2 ms-auto w-fit mt-3`}>
//               <Button
//                 type="button"
//                 onClick={() => {
//                   setShowForm((prev) => !prev);
//                 }}
//                 variant={"secondary"}
//               >
//                 Cancel
//               </Button>
//               <Button>Save</Button>
//             </div>
//           </CollapsibleContent>
//           <CollapsibleTrigger>
//             <span
//               onClick={() => {
//                 setShowForm((prev) => !prev);
//               }}
//               className={`${
//                 showForm ? "hidden" : "inline-block"
//               } mt-3 bg-primary px-4 py-2 rounded-md text-primary-foreground text-sm hover:bg-primary/95 inline-block`}
//             >
//               Edit Bio
//             </span>
//           </CollapsibleTrigger>
//         </form>
//       </Collapsible>
//     </>
//   );
// }
"use client";
import { addBio } from "@/lib/actions";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
export default function EditBio({ userBaseInfo, userId }: any) {
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(0);
  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bio = formData.get("bio") as string;
    // console.log(userId, bio);
    const bioData = {
      bio,
      userId,
    };
    await addBio(bioData);
    setShowForm(false);
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-[300px]  sm:w-[500px] px-5">
        {showForm ? null : (
          <p className={`text-center`}>
            {userBaseInfo && userBaseInfo.length > 0 ? userBaseInfo[0].bio : ""}
          </p>
        )}
        {userBaseInfo[0].clerkUserId === userId && (
          <>
            <form
              onSubmit={handleSubmit}
              className={`${showForm ? "block" : "hidden"} text-center`}
            >
              <Textarea
                onChange={(e) => {
                  const x = e.target.value.length;
                  setValue(x);
                }}
                className={`resize-none w-full`}
                defaultValue={
                  userBaseInfo && userBaseInfo.length > 0 && userBaseInfo[0].bio
                }
                name="bio"
              />
              <div className={`flex items-center gap-2 ms-auto w-fit mt-3`}>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm((prev) => !prev);
                  }}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <Button disabled={value > 100 ? true : false} type="submit">
                  Save
                </Button>
              </div>
            </form>
            <span
              onClick={() => {
                setShowForm((prev) => !prev);
              }}
              className={`${
                showForm ? "hidden" : "inline-block"
              }  bg-primary px-4 cursor-pointer self-center py-2 rounded-md text-primary-foreground text-sm hover:bg-primary/95 inline-block`}
            >
              {userBaseInfo && userBaseInfo.length > 0 && userBaseInfo[0].bio
                ? "Edit Bio"
                : "Add Bio"}
            </span>
          </>
        )}
      </div>
    </>
  );
}
