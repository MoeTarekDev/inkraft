"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
export async function createUser(user: any) {
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) {
    console.error("Supabase error:", error);

    throw new Error("user could not be created");
  }
  return data;
}

export async function updateUser(user: any) {
  const { clerkUserId, ...updatedFields } = user;
  const { error } = await supabase
    .from("users")
    .update(updatedFields)
    .eq("clerkUserId", clerkUserId);
  if (error) throw new Error("Error while updating profile");
  revalidatePath("/");
}
export async function getUser(Id: string | null) {
  "use client";
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerkUserId", Id);

  if (error) throw new Error("user's data could not be found!");

  return users;
}

export async function getUserFullPostData(
  Id: string | null | undefined,
  offset: number,
  limit: number
) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      created_at,
      caption,
      image,
      userId,
      isRepost,
      users (
        id,
        firstName,
        lastName,
        userName,
        imageUrl,
        bio,
        clerkUserId,
        coverUrl,
        coverUrl,followers!followers_followedId_fkey (
          id
        ),
        following:followers!followers_followerId_fkey (
          id
        )
      ),
      comments (
        id
      ),
      postVotes (
        voteType,
        userId
      ),
      original_post:originalPostId (
        id,
        created_at,
        caption,
        image,
        userId,
        users(
          id,
          firstName,
          lastName,
          userName,
          imageUrl,
          bio,
          clerkUserId,
          coverUrl,
          coverUrl,followers!followers_followedId_fkey (
          id
        ),
        following:followers!followers_followerId_fkey (
          id
        )
        ),
        comments (
          id
        ),
        postVotes (
          voteType,
          userId
        )
      )
    `
    )
    .eq("userId", Id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error)
    throw new Error("There was an error when fetching user's posts data");
  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("postId")
    .eq("userId", Id);

  if (bookmarksError) {
    throw new Error("Unable to fetch user's bookmarks data");
  }
  const bookmarksIds: any = new Set(bookmarksData?.map((post) => post.postId));

  const newData = data?.map((post) => {
    const isBookmarkedByUser = bookmarksIds.has(
      //@ts-expect-error nvm
      post.isRepost ? post.original_post.id : post.id
    );
    return {
      ...post,
      isBookmarkedByUser,
    };
  });
  return [...newData];
}
export async function getFollowedUsers(Id: string | null | undefined) {
  const { data, error } = await supabase
    .from("followers")
    .select("followedId")
    .eq("followerId", Id);

  if (error) throw new Error("Unable to fetch user's following list");

  return data;
}
export async function getFollowedUsersInfo(
  Id: string | null,
  offset: number,
  limit: number
) {
  const { data: followings, error } = await supabase
    .from("followers")
    .select(
      `
    users:followedId (
      id,
      clerkUserId,
      email,
      firstName,
      lastName,
      userName,
      imageUrl,
      bio,
      coverUrl,
      followers:followers!followers_followedId_fkey(id),
      following:followers!followers_followerId_fkey(id)
    )
    `
    )
    .eq("followerId", Id) // Fetch users the logged-in user follows
    .range(offset, offset + limit - 1);

  if (error) throw new Error("Unable to fetch user's following list's data");

  return [...followings];
}
export async function getUserFollowers(Id: string | null | undefined) {
  const { data, error } = await supabase
    .from("followers")
    .select("followerId")
    .eq("followedId", Id);

  if (error) throw new Error("Unable to fetch user's followers list");

  return data;
}
export async function getUserFollowersInfo(
  Id: string | null,
  offset: number,
  limit: number
) {
  const { data: followers, error } = await supabase
    .from("followers")
    .select(
      `
    followerId,
    users:followerId (
      id,
      clerkUserId,
      email,
      firstName,
      lastName,
      userName,
      imageUrl,
      bio,
      coverUrl,
      followers:followers!followers_followedId_fkey(id),
      following:followers!followers_followerId_fkey(id)
    )
    `
    )
    .eq("followedId", Id) // Fetch users who follow the logged-in user
    .range(offset, offset + limit - 1);

  if (error) throw new Error("Unable to fetch user's followers list's data");

  return followers;
}
export async function whoToFollow(
  Id: string | null,
  offset: number,
  limit: number
) {
  const followedUsers = await getFollowedUsers(Id);
  const followedUserIds = followedUsers?.map((follow) => follow.followedId);

  // Step 3: Fetch users that the logged-in user does NOT follow
  let query = supabase
    .from("users")
    .select(
      `id,
      clerkUserId,
      email,
      firstName,
      lastName,
      userName,
      imageUrl,
      bio,
      coverUrl,followers!followers_followedId_fkey (
          id
        ),
        following:followers!followers_followerId_fkey (
          id
        )
    `
    )
    .not("clerkUserId", "eq", Id)
    .range(offset, offset + limit - 1);

  if (followedUserIds && followedUserIds.length > 0) {
    query = query.not("clerkUserId", "in", `(${followedUserIds.join(",")})`);
  }

  const { data: users, error } = await query;

  if (error) throw new Error("Unable to fetch who to follow user's data");

  return users;
}
export async function allUsersExceptMe(Id: string | null) {
  const { data, error } = await supabase
    .from("users")
    .select(
      `id,
    clerkUserId,
    email,
    firstName,
    lastName,
    userName,
    imageUrl,
    bio,
    coverUrl,
    coverUrl,followers!followers_followedId_fkey (
          id
        ),
        following:followers!followers_followerId_fkey (
          id
        )
  `
    )
    .not("clerkUserId", "eq", Id);
  if (error) throw new Error("Unable to fetch all app user's Except you");
  return data;
}

export async function followUser(followerId: string, followedId: string) {
  const { error } = await supabase
    .from("followers")
    .insert([{ followerId: followerId, followedId: followedId }]);
  if (error) throw new Error("Unable to follow this user.");

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
}

export async function unFollowUser(followerId: string, followedId: string) {
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("followerId", followerId)
    .eq("followedId", followedId);

  if (error) throw new Error("Unable to unFollow this user.");

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
}

export async function getFollowedUsersPostsAndReposts(
  loggedInUserId: string,
  offset: number,
  limit: number
) {
  const followedUsers = await getFollowedUsers(loggedInUserId);
  const followedUserIds = followedUsers?.map((follow) => follow.followedId);

  const { data: followedPosts, error: postsError } = await supabase
    .from("posts")
    .select(
      `
    id,
    created_at,
    caption,
    isRepost,
    image,
    userId,
    users (
      id,
      firstName,
      lastName,
      userName,
      imageUrl,
      bio,
      clerkUserId,
      coverUrl,
      followers!followers_followedId_fkey (
        id
      ),
      following:followers!followers_followerId_fkey (
        id
      )
    ),
    comments (id),
    postVotes (voteType, userId),
    original_post:originalPostId (
      id,
      created_at,
      caption,
      image,
      userId,
      users (
        id,
        firstName,
        lastName,
        userName,
        imageUrl,
        bio,
        clerkUserId,
        coverUrl,
        followers!followers_followedId_fkey (
          id
        ),
        following:followers!followers_followerId_fkey (
          id
        )
      ),
      comments (id),
      postVotes (voteType, userId)
    )
  `
    )
    .in("userId", followedUserIds)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (postsError) throw new Error("Unable to fetch your feed data.");

  // Fetch reposted posts and bookmarks as before
  const { data: repostedPosts, error: repostsError } = await supabase
    .from("posts")
    .select("originalPostId")
    .eq("userId", loggedInUserId)
    .eq("isRepost", true);

  if (repostsError) throw new Error("Unable to fetch reposted posts.");

  const repostedPostIds = new Set(
    repostedPosts?.map((post) => post.originalPostId)
  );

  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("postId")
    .eq("userId", loggedInUserId);

  if (bookmarksError)
    throw new Error("Unable to fetch bookmarks data for your feed.");

  const bookmarksIds = new Set(bookmarksData?.map((post) => post.postId));

  const postsWithRepostStatus = followedPosts?.map((post) => {
    const isRepostedByUser = repostedPostIds.has(post.id);
    const isBookmarkedByUser = bookmarksIds.has(
      //@ts-expect-error nvm
      post.isRepost ? post.original_post.id : post.id
    );
    return {
      ...post,
      isRepostedByUser,
      isBookmarkedByUser,
    };
  });

  return postsWithRepostStatus;
}

export async function getFullPostData(postId: string | null, Id: string) {
  if (!postId) {
    return { error: "Invalid postId" };
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select(
      `
      *,
      users (
        firstName,
        lastName,
        userName,
        imageUrl,
        bio,
        clerkUserId,
        coverUrl,followers!followers_followedId_fkey (
          id
        ),
        following:followers!followers_followerId_fkey (
          id
        )
      )
    `
    )
    .eq("id", postId)
    .single();

  if (postError) throw new Error("Unable to fetch this post's data.");

  const { data: commentsData, error: commentsError } = await supabase
    .from("comments")
    .select(
      `
      *,
      users (
        firstName,
        lastName,
        userName,
        imageUrl,
        clerkUserId,
        followers!followers_followedId_fkey (
        id
      ),
      following:followers!followers_followerId_fkey (
        id
      )
      )
    `
    )
    .eq("postId", postId)
    .order("created_at", { ascending: true });

  if (commentsError)
    throw new Error("Unable to fetch this post's comment's data.");

  const { data: postVotes, error } = await supabase
    .from("postVotes")
    .select(
      ` 
      userId,
      voteType `
    )
    .eq("postId", postId);

  if (error) throw new Error("Unable to fetch post's votes");

  const { data: repostedPosts, error: repostsError } = await supabase
    .from("posts")
    .select("originalPostId")
    .eq("userId", Id)
    .eq("isRepost", true);

  if (repostsError) throw new Error("Unable to fetch user's reposted posts");

  const repostedPostIds = new Set(
    repostedPosts?.map((post) => post.originalPostId)
  );

  const isRepostedByUser = repostedPostIds.has(postData.id);
  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("postId")
    .eq("userId", Id);

  if (bookmarksError) throw new Error("Unable to fetch user's bookmarks data.");

  const bookmarksIds: any = new Set(bookmarksData?.map((post) => post.postId));
  const isBookmarkedByUser = bookmarksIds.has(postData.id);
  const fullPostInfo = {
    post: postData,
    comments: commentsData,
    postVotes,
    isRepostedByUser,
    isBookmarkedByUser,
  };

  return { data: fullPostInfo };
}
export async function addVote(voteData: {
  userId: string;
  postId: number;
  voteType: string;
}) {
  const { data, error } = await supabase.from("postVotes").insert([voteData]);
  if (error) throw new Error("Unable to vote to this post.");

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/[username]/status/[postId]", "page");
  revalidatePath("/");
  return data;
}

export async function deleteVote(userId: string, postId: number) {
  const { data, error } = await supabase
    .from("postVotes")
    .delete()
    .eq("userId", userId)
    .eq("postId", postId);
  if (error) throw new Error("Unable to vote to this post.");
  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
  return data;
}
export async function updateVote(
  userId: string,
  postId: number,
  voteType: string
) {
  const { data, error } = await supabase
    .from("postVotes")
    .update({ voteType: voteType })
    .eq("userId", userId)
    .eq("postId", postId);
  if (error) throw new Error("Unable to vote to this post.");

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
  return data;
}
export async function repostPost(
  originalPostId: number,
  repostingUserId: string
) {
  const { data, error } = await supabase.from("posts").insert([
    {
      userId: repostingUserId,
      isRepost: true,
      originalPostId: originalPostId,
    },
  ]);

  if (error) throw new Error("Unable to repost this post.");

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
  return data;
}
export async function undoRepostPost(userId: string, originalPostId: number) {
  const { data, error } = await supabase.from("posts").delete().match({
    userId: userId,
    originalPostId: originalPostId,
    isRepost: true,
  });

  if (error) throw new Error("Unable to undo repost this post.");

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
  return data;
}
export async function getUserRepostedPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    id,isRepost,
    original_post:originalPostId (
       id,
    created_at,
    caption,
    image,
    userId, users(id,
      firstName,
      lastName,
      userName,
      imageUrl,
      bio,
      clerkUserId,
      coverUrl)
    ),
    reposting_user:userId (
      firstName, lastName, userName
    )
  `
    )
    .eq("isRepost", true);
  if (error) throw new Error("Unable to fetch user's reposts.");
  return data;
}
export async function getUserBookmarkedPosts(
  loggedInUserId: string | null,
  offset: number,
  limit: number
) {
  // Fetch bookmarked posts
  const { data: bookmarkedPosts, error: bookmarkedError } = await supabase
    .from("bookmarks")
    .select(
      `
      posts (
        id,
        created_at,
        caption,
        image,
        userId,
        users (
          id,
          firstName,
          lastName,
          userName,
          imageUrl,
          bio,
          clerkUserId,
          coverUrl,
          followers:followers!followers_followedId_fkey (id),
          following:followers!followers_followerId_fkey (id)
        ),
        comments (
          id
        ),
        postVotes (
          voteType,
          userId
        )
      )
    `
    )
    .eq("userId", loggedInUserId) // Make sure to filter by logged-in user
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (bookmarkedError)
    throw new Error("Unable to fetch user's bookmarked posts.");

  // Fetch user's reposts to check if the logged-in user has reposted any of these posts
  const { data: repostedPosts, error: repostsError } = await supabase
    .from("posts")
    .select("originalPostId")
    .eq("userId", loggedInUserId)
    .eq("isRepost", true);

  if (repostsError) throw new Error("Unable to fetch user's reposts.");

  // Create a set of reposted post IDs for quick lookup
  const repostedPostIds = new Set(
    repostedPosts?.map((post) => post.originalPostId)
  );

  // Add isBookmarkedByUser and isRepostedByUser to each post
  const postsWithDetails = bookmarkedPosts?.map((bookmark) => {
    const post = bookmark.posts;

    // Determine if the logged-in user has bookmarked and reposted this post
    const isBookmarkedByUser = true; // All posts in this list are bookmarked
    //@ts-expect-error nvm
    const isRepostedByUser = repostedPostIds.has(post.id);

    return {
      ...post,
      isBookmarkedByUser,
      isRepostedByUser,
    };
  });

  return postsWithDetails;
}
export async function deleteAllBookmarks(userId: string) {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("userId", userId);
  if (error) throw new Error("Unable to delete all bookmarks!");

  revalidatePath("/bookmarks");
  revalidatePath("/profile/[userId]", "page");
}
export async function fetchNotificationsForUser(
  userId: string | undefined,
  offset: number,
  limit: number
) {
  const { data, error } = await supabase
    .from("notifications")
    .select(
      `
    id,
    created_at,
    read,
    type,
    users:senderId  (
      firstName,
      lastName,
      userName,
      clerkUserId,
      imageUrl,
      followers:followers!followers_followedId_fkey(id),
      following:followers!followers_followerId_fkey(id)
    ),
    posts (
      id,
      caption,
      image,
      created_at,
      users:userId (
        firstName,
        clerkUserId,
        lastName,
        userName,
        imageUrl,
        followers:followers!followers_followedId_fkey(id),
        following:followers!followers_followerId_fkey(id)
      )
    )
  `
    )
    .eq("userId", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error("Unable to fetch user's notifications.");

  return data;
}
