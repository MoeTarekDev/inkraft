import { supabase } from "./supabase";

export async function createUser(user: any) {
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) {
    console.error("Supabase error:", error);

    throw new Error("user could not be created");
  }
  return data;
}
