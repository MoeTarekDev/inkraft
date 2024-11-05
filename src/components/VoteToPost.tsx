// "use client";
// import { useToast } from "@/hooks/use-toast";
// import { sendNotification } from "@/lib/actions";
// import { addVote, deleteVote, updateVote } from "@/lib/users";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { startTransition, useEffect, useOptimistic } from "react";

// export default function VoteToPost({
//   singlePostMode,
//   postId,
//   userId,
//   voteCountForNormalMode,
//   voteCountForSinglePostMode,
//   postVotes,
//   receiverId,
// }: {
//   singlePostMode: boolean;
//   postId: any;
//   userId: string;
//   voteCountForNormalMode: any;
//   voteCountForSinglePostMode: any;
//   postVotes: any;
//   receiverId: any;
// }) {
//   const didIUpVote = postVotes.filter(
//     (vote: { userId: string; voteType: string }) =>
//       vote.userId === userId && vote.voteType === "upvote"
//   );
//   const didIDownVote = postVotes.filter(
//     (vote: { userId: string; voteType: string }) =>
//       vote.userId === userId && vote.voteType === "downvote"
//   );
//   const { toast } = useToast();
//   const [upVoteOptimistic, setUpVoteOptimisticVote] = useOptimistic<boolean>(
//     didIUpVote.length > 0
//   );
//   const [downVoteOptimistic, setDownVoteOptimisticVote] =
//     useOptimistic<boolean>(didIDownVote.length > 0);

//   const [voteCountOptimistic, setVoteCountOptimistic] = useOptimistic(
//     singlePostMode ? voteCountForSinglePostMode : voteCountForNormalMode
//   );

//   useEffect(() => {
//     console.log(voteCountOptimistic);
//   }, [voteCountOptimistic]);
//   async function handleUpVote() {
//     const voteData = {
//       postId,
//       userId,
//       voteType: "upvote",
//     };
//     try {
//       await addVote(voteData);
//       if (userId !== receiverId) {
//         await sendNotification(receiverId, userId, "vote", postId);
//       }
//     } catch (error: any) {
//       toast({
//         variant: "destructive",
//         description: error.message,
//       });
//     }
//   }
//   async function handleDownVote() {
//     const voteData = {
//       postId,
//       userId,
//       voteType: "downvote",
//     };
//     try {
//       await addVote(voteData);
//       if (userId !== receiverId) {
//         await sendNotification(receiverId, userId, "vote", postId);
//       }
//     } catch (error: any) {
//       toast({
//         variant: "destructive",
//         description: error.message,
//       });
//     }
//   }

//   const handleUpVoteClick = () => {
//     startTransition(() => {
//       setUpVoteOptimisticVote((prev) => !prev);
//       setDownVoteOptimisticVote(false);

//       if (voteCountOptimistic === -1) {
//         if (didIUpVote.length) {
//           setVoteCountOptimistic((prev: number) => prev - 1);
//           deleteVote(userId, postId);
//         } else if (didIDownVote.length) {
//           setVoteCountOptimistic((prev: number) => prev + 2);
//           updateVote(userId, postId, "upvote");
//         } else if (!didIUpVote.length) {
//           setVoteCountOptimistic((prev: number) => prev + 1);
//           handleUpVote();
//         }
//       } else {
//         if (didIUpVote.length) {
//           setVoteCountOptimistic((prev: number) => prev - 1);
//           deleteVote(userId, postId);
//         } else if (didIDownVote.length) {
//           setVoteCountOptimistic((prev: number) => prev + 1);
//           updateVote(userId, postId, "upvote");
//         } else if (!didIUpVote.length) {
//           setVoteCountOptimistic((prev: number) => prev + 1);
//           handleUpVote();
//         }
//       }
//     });
//   };
//   const handleDownVoteClick = () => {
//     startTransition(() => {
//       setDownVoteOptimisticVote((prev) => !prev);
//       setUpVoteOptimisticVote(false);
//       if (voteCountOptimistic === 1) {
//         if (didIDownVote.length) {
//           setVoteCountOptimistic((prev: number) => prev + 1);
//           deleteVote(userId, postId);
//         } else if (didIUpVote.length) {
//           setVoteCountOptimistic((prev: number) => prev - 2);
//           updateVote(userId, postId, "downvote");
//         } else {
//           setVoteCountOptimistic((prev: number) => prev - 1);
//           handleDownVote();
//         }
//       } else {
//         if (didIDownVote.length) {
//           setVoteCountOptimistic((prev: number) => prev + 1);
//           deleteVote(userId, postId);
//         } else if (didIUpVote.length) {
//           setVoteCountOptimistic((prev: number) => prev - 1);
//           updateVote(userId, postId, "downvote");
//         } else {
//           setVoteCountOptimistic((prev: number) => prev - 1);
//           handleDownVote();
//         }
//       }
//     });
//   };
//   if (singlePostMode) {
//     return (
//       <>
//         <div
//           title="Vote"
//           className="border self-stretch flex items-center gap-1 p-2 w-1/3 justify-center rounded-md hover:bg-accent z-20"
//         >
//           <ChevronUp
//             onClick={() => {
//               if (didIUpVote.length) {
//                 deleteVote(userId, postId);
//               } else if (didIDownVote.length) {
//                 updateVote(userId, postId, "upvote");
//               } else {
//                 handleUpVote();
//               }
//             }}
//             className={` ${
//               didIUpVote.length ? "bg-primary text-primary-foreground" : ""
//             } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
//           />
//           <span className="cursor-default inline-block">
//             {voteCountForSinglePostMode}
//           </span>
//           <ChevronDown
//             onClick={() => {
//               if (didIDownVote.length) {
//                 deleteVote(userId, postId);
//               } else if (didIUpVote.length) {
//                 updateVote(userId, postId, "downvote");
//               } else {
//                 handleDownVote();
//               }
//             }}
//             className={`${
//               didIDownVote.length ? "bg-primary text-primary-foreground" : ""
//             } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
//           />
//         </div>
//       </>
//     );
//   }
//   return (
//     <>
//       <div
//         title="Vote"
//         className="border self-stretch flex items-center gap-1 p-2 w-1/3 justify-center rounded-md hover:bg-accent z-20"
//       >
//         <ChevronUp
//           onClick={handleUpVoteClick}
//           className={` ${
//             upVoteOptimistic ? "bg-primary text-primary-foreground" : ""
//           } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
//         />
//         <span className="cursor-default">{voteCountOptimistic || ""}</span>
//         <ChevronDown
//           onClick={handleDownVoteClick}
//           className={`${
//             downVoteOptimistic ? "bg-primary text-primary-foreground" : ""
//           } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
//         />
//       </div>
//     </>
//   );
// }
"use client";
import { useToast } from "@/hooks/use-toast";
import { sendNotification } from "@/lib/actions";
import { addVote, deleteVote, updateVote } from "@/lib/users";
import { ChevronDown, ChevronUp } from "lucide-react";
import { startTransition, useOptimistic } from "react";

export default function VoteToPost({
  singlePostMode,
  postId,
  userId,
  voteCountForNormalMode,
  voteCountForSinglePostMode,
  postVotes,
  receiverId,
}: {
  singlePostMode: boolean;
  postId: any;
  userId: string;
  voteCountForNormalMode: any;
  voteCountForSinglePostMode: any;
  postVotes: any;
  receiverId: any;
}) {
  const didIUpVote = postVotes.some(
    (vote: { userId: string; voteType: string }) =>
      vote.userId === userId && vote.voteType === "upvote"
  );
  const didIDownVote = postVotes.some(
    (vote: { userId: string; voteType: string }) =>
      vote.userId === userId && vote.voteType === "downvote"
  );
  const { toast } = useToast();

  // Use useOptimistic for vote state
  const [voteState, updateVoteState] = useOptimistic(
    {
      didIUpVote,
      didIDownVote,
      voteCount: singlePostMode
        ? voteCountForSinglePostMode
        : voteCountForNormalMode,
    },
    (current, newVoteType) => {
      let updatedVoteCount = current.voteCount;
      let updatedDidIUpVote = current.didIUpVote;
      let updatedDidIDownVote = current.didIDownVote;

      if (newVoteType === "upvote") {
        if (current.didIUpVote) {
          updatedVoteCount -= 1;
          updatedDidIUpVote = false;
        } else {
          updatedVoteCount += current.didIDownVote ? 2 : 1;
          updatedDidIUpVote = true;
          updatedDidIDownVote = false;
        }
      } else if (newVoteType === "downvote") {
        if (current.didIDownVote) {
          updatedVoteCount += 1;
          updatedDidIDownVote = false;
        } else {
          updatedVoteCount -= current.didIUpVote ? 2 : 1;
          updatedDidIDownVote = true;
          updatedDidIUpVote = false;
        }
      }

      return {
        didIUpVote: updatedDidIUpVote,
        didIDownVote: updatedDidIDownVote,
        voteCount: updatedVoteCount,
      };
    }
  );

  const handleVote = async (voteType: "upvote" | "downvote") => {
    const voteData = { postId, userId, voteType };

    try {
      if (voteType === "upvote") {
        if (voteState.didIUpVote) {
          await deleteVote(userId, postId);
        } else {
          if (voteState.didIDownVote) {
            await updateVote(userId, postId, "upvote");
          } else {
            await addVote(voteData);
          }
          if (userId !== receiverId) {
            await sendNotification(receiverId, userId, "vote", postId);
          }
        }
      } else if (voteType === "downvote") {
        if (voteState.didIDownVote) {
          await deleteVote(userId, postId);
        } else {
          if (voteState.didIUpVote) {
            await updateVote(userId, postId, "downvote");
          } else {
            await addVote(voteData);
          }
          if (userId !== receiverId) {
            await sendNotification(receiverId, userId, "vote", postId);
          }
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };

  const handleUpVoteClick = () => {
    startTransition(() => {
      updateVoteState("upvote");
      handleVote("upvote");
    });
  };

  const handleDownVoteClick = () => {
    startTransition(() => {
      updateVoteState("downvote");
      handleVote("downvote");
    });
  };

  return (
    <div
      title="Vote"
      className="border self-stretch flex items-center gap-1 p-2 w-1/3 justify-center rounded-md hover:bg-accent z-20"
    >
      <ChevronUp
        onClick={handleUpVoteClick}
        className={`${
          voteState.didIUpVote ? "bg-primary text-primary-foreground" : ""
        } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
      />
      <span className="cursor-default">{voteState.voteCount || ""}</span>
      <ChevronDown
        onClick={handleDownVoteClick}
        className={`${
          voteState.didIDownVote ? "bg-primary text-primary-foreground" : ""
        } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
      />
    </div>
  );
}
