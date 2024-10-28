"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

export async function createPost(postData) {
  const { userId } = auth();
  if (!userId) return new Error("You must be logged in");
  const postInfo = [{ ...postData, userId }];

  const { data, error } = await supabase
    .from("posts")
    .insert(postInfo)
    .select();
  if (error) throw new Error("There is an error while creating the post.");
  revalidatePath("/profile/[userId]", "page");
  return data;
}

export async function addComment(commentData) {
  const { data, error } = await supabase.from("comments").insert([commentData]);

  if (error) throw new Error("there was an error while adding the comment.");

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
  if (error) throw new Error("there was an error while deleting your post.");

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
}

export async function addToBookmarks(userId, postId) {
  const { error } = await supabase
    .from("bookmarks")
    .insert([{ userId: userId, postId: postId }])
    .select();
  if (error) throw new Error("Unable to add post to bookmarks!");

  revalidatePath("/", "page");
}
export async function removeFromBookmarks(userId, postId) {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("userId", userId)
    .eq("postId", postId);
  if (error) throw new Error("Unable to remove post from bookmarks!");

  revalidatePath("/", "page");
}
export async function addBio(bioData) {
  const { bio, userId } = bioData;
  if (bio === null || bio.trim() === "") {
    throw new Error("Bio can not be empty.");
  }

  const { data, error } = await supabase
    .from("users")
    .update({ bio })
    .eq("clerkUserId", userId);

  if (error) throw new Error("there was and error while adding bio.");

  console.log("Bio updated:", data);
  revalidatePath(`/profile/${userId}`);
}
export async function sendNotification(userId, senderId, type, postId) {
  const list = {
    userId,
    senderId,
    type,
    postId,
  };
  const { error } = await supabase
    .from("notifications")
    .insert([list])
    .select();

  if (error) console.log(error);
}
export async function readNotification(userId, notificationId) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("userId", userId)
    .eq("id", notificationId);

  if (error) {
    console.log(error);
  }
  // revalidateTag("notifications");
  // revalidatePath("/notifications", "page");
}
export async function readAllNotifications(userId) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("userId", userId);

  if (error)
    throw new Error("there was and error while reading notifications.");

  revalidatePath("/", "page");
}
