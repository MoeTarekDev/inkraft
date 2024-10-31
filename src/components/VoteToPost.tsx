"use client";
import { useToast } from "@/hooks/use-toast";
import { sendNotification } from "@/lib/actions";
import { addVote, deleteVote, updateVote } from "@/lib/users";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const { toast } = useToast();
  async function handleUpVote() {
    const voteData = {
      postId,
      userId,
      voteType: "upvote",
    };
    try {
      await addVote(voteData);
      if (userId !== receiverId) {
        await sendNotification(receiverId, userId, "vote", postId);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  }
  async function handleDownVote() {
    const voteData = {
      postId,
      userId,
      voteType: "downvote",
    };
    try {
      await addVote(voteData);
      if (userId !== receiverId) {
        await sendNotification(receiverId, userId, "vote", postId);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  }
  const didIUpVote = postVotes.filter(
    (vote: { userId: string; voteType: string }) =>
      vote.userId === userId && vote.voteType === "upvote"
  );
  const didIDownVote = postVotes.filter(
    (vote: { userId: string; voteType: string }) =>
      vote.userId === userId && vote.voteType === "downvote"
  );

  if (singlePostMode) {
    return (
      <>
        <div
          title="Vote"
          className="border self-stretch flex items-center gap-1 p-2 w-1/3 justify-center rounded-md hover:bg-accent z-20"
        >
          <ChevronUp
            onClick={() => {
              if (didIUpVote.length) {
                deleteVote(userId, postId);
              } else if (didIDownVote.length) {
                updateVote(userId, postId, "upvote");
              } else {
                handleUpVote();
              }
            }}
            className={` ${
              didIUpVote.length ? "bg-primary text-primary-foreground" : ""
            } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
          />
          <span className="cursor-default inline-block">
            {voteCountForSinglePostMode}
          </span>
          <ChevronDown
            onClick={() => {
              if (didIDownVote.length) {
                deleteVote(userId, postId);
              } else if (didIUpVote.length) {
                updateVote(userId, postId, "downvote");
              } else {
                handleDownVote();
              }
            }}
            className={`${
              didIDownVote.length ? "bg-primary text-primary-foreground" : ""
            } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        title="Vote"
        className="border self-stretch flex items-center gap-1 p-2 w-1/3 justify-center rounded-md hover:bg-accent z-20"
      >
        <ChevronUp
          onClick={() => {
            if (didIUpVote.length) {
              deleteVote(userId, postId);
            } else if (didIDownVote.length) {
              updateVote(userId, postId, "upvote");
            } else {
              handleUpVote();
            }
          }}
          className={` ${
            didIUpVote.length ? "bg-primary text-primary-foreground" : ""
          } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
        />
        <span className="cursor-default ">{voteCountForNormalMode}</span>
        <ChevronDown
          onClick={() => {
            if (didIDownVote.length) {
              deleteVote(userId, postId);
            } else if (didIUpVote.length) {
              updateVote(userId, postId, "downvote");
            } else {
              handleDownVote();
            }
          }}
          className={`${
            didIDownVote.length ? "bg-primary text-primary-foreground" : ""
          } hover:bg-primary press-effect hover:text-primary-foreground rounded-full cursor-pointer w-5 h-5`}
        />
      </div>
    </>
  );
}
