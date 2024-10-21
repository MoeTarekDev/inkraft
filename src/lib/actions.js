"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function createPost(postData) {
  const { userId } = auth();
  if (!userId) return new Error("You must be logged in");
  const postInfo = [{ ...postData, userId }];

  const { data, error } = await supabase
    .from("posts")
    .insert(postInfo)
    .select();
  console.log(data);
  if (error) console.log(error);
  return data;
}

export async function addComment(commentData) {
  const { data, error } = await supabase.from("comments").insert([commentData]);

  if (error) {
    console.error("Error adding comment:", error);
    return null;
  }
  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/[username]/status/[postId]", "page");
  revalidatePath("/");
  return data;
}

export async function deletePost(userId, postId) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("userId", userId)
    .eq("id", postId);
  if (error) {
    console.log(error);
    throw new Error("Failed to delete post");
  }
  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
}

export async function addToBookmarks(userId, postId) {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ userId: userId, postId: postId }])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Unable to add post to bookmarks!");
  }
  revalidatePath("/", "page");
}
export async function removeFromBookmarks(userId, postId) {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("userId", userId)
    .eq("postId", postId);
  if (error) {
    console.log(error);
    throw new Error("Unable to delete post from bookmarks!");
  }
  revalidatePath("/", "page");
}
export async function addBio(bioData) {
  const { bio } = bioData;
  const { userId } = bioData;
  const { data, error } = await supabase
    .from("users")
    .update({ bio: bio })
    .eq("clerkUserId", userId);
  if (error) {
    console.log(error);
  }
  console.log(data);

  revalidatePath("/profile/[userId]", "page");
}
