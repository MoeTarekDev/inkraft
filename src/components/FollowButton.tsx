"use client";
import { followUser, unFollowUser } from "@/lib/users";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { sendNotification } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export default function FollowButton({
  followerId,
  followedId,
  loggedInUserFollowedUsers,
}: any) {
  const [userIsFollowed, setUserIsFollowed] = useState<any>([]);
  const { toast } = useToast();
  useEffect(() => {
    if (loggedInUserFollowedUsers) {
      setUserIsFollowed(() => {
        return loggedInUserFollowedUsers.filter(
          (user: any) => user?.followedId === followedId
        );
      });
    }
  }, [loggedInUserFollowedUsers, followedId]);

  return (
    <div className={`z-20 relative`}>
      {userIsFollowed.length > 0 ? (
        <Button
          variant={"destructive"}
          onClick={async (e) => {
            try {
              e.stopPropagation();
              await unFollowUser(followerId, followedId);
            } catch (error: any) {
              toast({
                variant: "destructive",
                description: error.message,
              });
            }
          }}
          className={
            "inline-block press-effect text-xs cursor-pointer py-1 px-4"
          }
        >
          UnFollow
        </Button>
      ) : (
        <Button
          onClick={async (e) => {
            try {
              e.stopPropagation();
              await followUser(followerId, followedId);
              if (followedId !== followerId) {
                await sendNotification(followedId, followerId, "follow", null);
              }
            } catch (error: any) {
              toast({
                variant: "destructive",
                description: error.message,
              });
            }
          }}
          className={
            "inline-block press-effect text-xs cursor-pointer py-1 px-4"
          }
        >
          Follow
        </Button>
      )}
    </div>
  );
}
