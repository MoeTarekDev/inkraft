"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "./supabase";

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
