export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string;
  bio: string | null;
  clerkUserId: string;
  coverUrl: string | null;
  following: following[];
  followers: followers[];
}
export interface following {
  id: number;
}
export interface followers {
  id: number;
}
export interface Comment {
  id: number;
  created_at?: string;
  content?: string; // Assuming each comment has content
  userId?: string;
}

export interface PostVotes {
  voteType: "upvote" | "downvote";
  userId?: string;
}

export interface OriginalPost {
  id: number;
  created_at: string;
  caption: string | null;
  image: string | null;
  userId: string;
  users: User;
  comments: Comment[];
  postVotes: PostVotes[];
}

export interface Post {
  id: number;
  created_at: string;
  caption: string | null;
  image: string | null;
  userId: string;
  isRepost?: boolean;
  users: User;
  comments: Comment[];
  postVotes: PostVotes[];
  original_post?: OriginalPost; // This will be present only if isRepost is true
  isRepostedByUser?: boolean;
  isBookmarkedByUser?: boolean;
}
export interface UserProfile {
  id: number;
  bio: string | null;
  coverUrl: string | null;
  imageUrl: string;
  lastName: string;
  userName: string;
  firstName: string;
  created_at: string;
  email: string;
  clerkUserId: string;
}
interface UserBigPost {
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string;
  bio?: string;
  clerkUserId: string;
}

interface PostBigPost {
  id: number;
  created_at: string;
  caption: string;
  image: string;
  userId: string;
  isRepost: boolean;
  users: UserBigPost; // Reference to the post publisher's info
}

export interface CommentBigPost {
  id: number;
  created_at: string;
  content: string;
  userId: string;
  postId: number;
  users: UserBigPost; // Reference to the comment publisher's info
}

interface VotesBigPost {
  upvotes: number;
  downvotes: number;
  allVotes?: {
    voteType: string;
    users: UserBigPost;
  }[]; // Optional if you want to store all vote details
}

interface FullPostInfo {
  post: PostBigPost;
  comments: CommentBigPost[];
  votes: VotesBigPost;
}

export interface PostResponse {
  data: FullPostInfo;
}
