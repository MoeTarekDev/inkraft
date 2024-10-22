"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import FollowUser from "./FollowUser";
import { User } from "@/lib/types";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function FindLogic({
  users,
  userId,
  loggedInUserFollowedUsers,
}: any) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filteredItems = useMemo(() => {
    return users?.filter((user: User) => {
      return (
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.userName.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query, users]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        setQuery("");
      }}
    >
      <DialogTrigger className="sm:w-full flex justify-center">
        <li
          title="Find"
          className="p-2 lg:p-3 w-fit hover:bg-accent text-accent-foreground rounded-full lg:w-full lg:rounded-md text-lg lg:text-sm cursor-pointer"
        >
          <div className="flex lg:p-0 justify-center lg:justify-start items-center gap-0 lg:gap-4">
            <Search className="lg:w-5 lg:h-5 w-6 h-6" />
            <span className="hidden lg:inline-block">Find</span>
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90%] md:h-[382px] overflow-y-auto overflow-x-visible p-1 z-[99999] ">
        <DialogHeader className="hidden">
          <DialogTitle className="hidden">Find people</DialogTitle>
          <DialogDescription className="hidden">
            Search people to grow your connections
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="absolute top-0  left-0 right-0 flex items-center p-3 pt-2 pe-6 border-b">
            <Search className="w-4 h-4  text-muted-foreground" />
            <Input
              value={query}
              type="text"
              placeholder="Search People"
              autoFocus={true}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="border-0 focus-visible:ring-0 shadow-none rounded-none"
            />
          </div>
          <div
            className={`mt-16 ${
              query && query.length > 0 ? "block" : "hidden"
            }`}
          >
            {filteredItems.map((user: User) => (
              <div
                key={user.id}
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                <FollowUser
                  loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                  showFollowButton={false}
                  user={user}
                  userId={userId}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
