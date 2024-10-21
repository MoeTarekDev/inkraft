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

export async function getUser(Id: string | null) {
  "use client";
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerkUserId", Id);

  if (error) throw new Error("user's data could not be found!");

  return users;
}

export async function getUserFullPostData(Id: string | null) {
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
    .order("created_at", { ascending: false });
  if (error) console.log(error);
  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("postId")
    .eq("userId", Id);

  if (bookmarksError) {
    console.log(bookmarksError);
    throw new Error("Unable to fetch user's bookmarks at home page");
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
  //@ts-expect-error nvm
  return [...newData];
}
export async function getFollowedUsers(Id: string | null) {
  const { data, error } = await supabase
    .from("followers")
    .select("followedId")
    .eq("followerId", Id);

  if (error) {
    console.error("Error fetching followed users:", error);
  }

  return data;
}
export async function getFollowedUsersInfo(Id: string | null) {
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
    .eq("followerId", Id); // Fetch users the logged-in user follows

  if (error) {
    console.error("Error fetching followings:", error);
    return { error };
  }

  return [...followings];
}
export async function getUserFollowers(Id: string | null) {
  const { data, error } = await supabase
    .from("followers")
    .select("followerId")
    .eq("followedId", Id);

  if (error) {
    console.error("Error fetching followed users:", error);
  }

  return data;
}
export async function getUserFollowersInfo(Id: string | null) {
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
    .eq("followedId", Id); // Fetch users who follow the logged-in user

  if (error) {
    console.error("Error fetching followers:", error);
    return { error };
  }

  return followers;
}
export async function whoToFollow(Id: string | null) {
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
    .not("clerkUserId", "eq", Id); // Exclude the logged-in user

  // Add the "not in" clause only if the user is following anyone
  if (followedUserIds && followedUserIds.length > 0) {
    query = query.not("clerkUserId", "in", `(${followedUserIds.join(",")})`); // Exclude followed users
  }

  const { data: users, error } = await query;

  if (error) {
    console.error("Error fetching users:", error);
  }
  // console.log(users);
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
  if (error) console.log(error);
  return data;
}

export async function followUser(followerId: string, followedId: string) {
  const { data, error } = await supabase
    .from("followers")
    .insert([{ followerId: followerId, followedId: followedId }]);
  if (error) console.log(error);

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
}

export async function unFollowUser(followerId: string, followedId: string) {
  const { data, error } = await supabase
    .from("followers")
    .delete()
    .eq("followerId", followerId)
    .eq("followedId", followedId);

  if (error) {
    console.error("Error unfollowing user:", error);
  }

  revalidatePath("/profile/[userId]", "page");
  revalidatePath("/");
}

export async function getFollowedUsersPostsAndReposts(loggedInUserId: string) {
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
    //@ts-expect-error
    .in("userId", followedUserIds)
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Error fetching followed users' posts:", postsError);
    return { error: postsError };
  }

  // Fetch reposted posts and bookmarks as before
  const { data: repostedPosts, error: repostsError } = await supabase
    .from("posts")
    .select("originalPostId")
    .eq("userId", loggedInUserId)
    .eq("isRepost", true);

  if (repostsError) {
    console.error("Error fetching user's reposts:", repostsError);
    return { error: repostsError };
  }

  const repostedPostIds = new Set(
    repostedPosts?.map((post) => post.originalPostId)
  );

  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("postId")
    .eq("userId", loggedInUserId);

  if (bookmarksError) {
    console.error("Error fetching user's bookmarks:", bookmarksError);
    throw new Error("Unable to fetch user's bookmarks at home page");
  }

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
    console.error("Error: postId is undefined or null");
    return { error: "Invalid postId" };
  }

  console.log("Fetching post with postId:", postId);

  // Step 1: Fetch the post's full info and publisher info
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

  if (postError) {
    console.error("Error fetching post info:", postError);
    return { error: postError };
  }

  // Step 2: Fetch all comments for the post
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
        clerkUserId
      )
    `
    )
    .eq("postId", postId)
    .order("created_at", { ascending: true });

  if (commentsError) {
    console.error("Error fetching comments:", commentsError);
    return { error: commentsError };
  }

  const { data: postVotes, error } = await supabase
    .from("postVotes")
    .select(
      ` 
      userId,
      voteType `
    )
    .eq("postId", postId);

  if (error) {
    console.error("Error fetching votes:", error);
    return error;
  }
  const { data: repostedPosts, error: repostsError } = await supabase
    .from("posts")
    .select("originalPostId")
    .eq("userId", Id)
    .eq("isRepost", true);

  if (repostsError) {
    console.error("Error fetching user's reposts:", repostsError);
    return { error: repostsError };
  }

  // Step 4: Create a set of reposted post IDs for quick lookup
  const repostedPostIds = new Set(
    repostedPosts?.map((post) => post.originalPostId)
  );

  const isRepostedByUser = repostedPostIds.has(postData.id);
  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("postId")
    .eq("userId", Id);

  if (bookmarksError) {
    console.log(bookmarksError);
    throw new Error("Unable to fetch user's bookmarks at home page");
  }
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
  if (error) {
    console.log(error);
  }
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
  if (error) {
    console.log(error);
  }
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
  if (error) {
    console.log(error);
  }
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

  if (error) {
    console.error("Error reposting:", error);
    return null;
  }
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

  if (error) {
    console.error("Error undoing repost:", error);
    return null;
  }
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
  if (error) console.log(error);
  return data;
}
export async function getUserBookmarkedPosts(loggedInUserId: string | null) {
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
    .order("created_at", { ascending: false });

  if (bookmarkedError) {
    console.error("Error fetching bookmarked posts:", bookmarkedError);
    return { error: bookmarkedError };
  }

  // Fetch user's reposts to check if the logged-in user has reposted any of these posts
  const { data: repostedPosts, error: repostsError } = await supabase
    .from("posts")
    .select("originalPostId")
    .eq("userId", loggedInUserId)
    .eq("isRepost", true);

  if (repostsError) {
    console.error("Error fetching user's reposts:", repostsError);
    return { error: repostsError };
  }

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
  if (error) {
    console.log(error);
    throw new Error("Unable to add post to bookmarks!");
  }

  revalidatePath("/bookmarks");
  revalidatePath("/profile/[userId]", "page");
}
