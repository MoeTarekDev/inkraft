"use client";
import { useToast } from "@/hooks/use-toast";
import { addBio } from "@/lib/actions";
import { useOptimistic, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
export default function EditBio({ userBaseInfo, userId }: any) {
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(0);
  const { toast } = useToast();
  const [bioOptimistic, setBioOptimistic] = useOptimistic<string | null>(
    userBaseInfo[0].bio
  );
  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bio = formData.get("bio") as string;
    const bioData = {
      bio,
      userId,
    };
    setBioOptimistic(bio);
    setShowForm(false);

    try {
      await addBio(bioData);
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-[300px]  sm:w-[500px] px-5">
        {showForm ? null : (
          <p className={`text-center`}>
            {/* {userBaseInfo && userBaseInfo.length > 0 ? userBaseInfo[0].bio : ""} */}
            {bioOptimistic}
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
                <Button disabled={value > 100} type="submit">
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
