import { getRelativeTime } from "@/lib/features";
import { CommentBigPost, Post } from "@/lib/types";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CaptionCardMini from "./CaptionCardMini";
import PostOptions from "./PostOptions";
import ReplyToPost from "./ReplyToPost";
import ReplyToPostDialog from "./ReplyToPostDialog";
import RepostPost from "./RepostPost";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import UserUserNameWithHover from "./UserUserNameWithHover";
import VoteToPost from "./VoteToPost";
export default function CaptionCard({
  rounded,
  singlePostMode,
  post,
  userId,
  loggedInUserFollowedUsers,
  bigPost,
  personalInfo,
  userImage,
}: {
  rounded: boolean;
  singlePostMode: boolean;
  userId: string;
  post: Post;
  loggedInUserFollowedUsers: any;
  bigPost: any;
  personalInfo: any;
  userImage: string | null;
}) {
  let upVoteCountForNormalMode = null;
  let downVoteCountForNormalMode = null;
  let voteCountForNormalMode = null;
  let upVoteCountForSinglePostMode = null;
  let downVoteCountForSinglePostMode = null;
  let voteCountForSinglePostMode = null;

  if (!singlePostMode && post.isRepost && post.original_post) {
    upVoteCountForNormalMode = post.original_post.postVotes.filter(
      (vote: { voteType: string }) => vote.voteType === "upvote"
    );
    downVoteCountForNormalMode = post.original_post.postVotes.filter(
      (vote: { voteType: string }) => vote.voteType === "downvote"
    );
    voteCountForNormalMode =
      upVoteCountForNormalMode.length - downVoteCountForNormalMode.length ||
      null;
  } else {
    upVoteCountForNormalMode = post?.postVotes?.filter(
      (vote: { voteType: string }) => vote.voteType === "upvote"
    );
    downVoteCountForNormalMode = post?.postVotes?.filter(
      (vote: { voteType: string }) => vote.voteType === "downvote"
    );
    voteCountForNormalMode =
      upVoteCountForNormalMode?.length - downVoteCountForNormalMode?.length ||
      null;
  }

  if (singlePostMode) {
    upVoteCountForSinglePostMode = bigPost?.postVotes.filter(
      (vote: { voteType: string }) => vote.voteType === "upvote"
    );
    downVoteCountForSinglePostMode = bigPost?.postVotes.filter(
      (vote: { voteType: string }) => vote.voteType === "downvote"
    );
    voteCountForSinglePostMode =
      upVoteCountForSinglePostMode.length -
        downVoteCountForSinglePostMode.length || null;
  }

  if (singlePostMode)
    return (
      <article
        className={`${
          rounded
            ? "caption-card-rounded sm:rounded-lg w-full md:w-[90%] p-3 sm:p-5 sm:border-2"
            : "w-full p-3 sm:p-5 caption-card-not-rounded"
        }  bg-card  h-fit border-b-2`}
      >
        <div className="w-full flex flex-col gap-2 flex-wrap">
          <div className="flex items-center gap-3 ">
            <UserAvatarWithHover
              user={post?.users}
              userId={userId}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
            <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2 flex-wrap">
              <UserNameWithHover
                user={post?.users}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <UserUserNameWithHover
                user={post?.users}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />

              <div className="text-muted-foreground text-xs text-center line-clamp-1 ">
                <span className="dot me-1"></span>
                <span>{getRelativeTime(bigPost?.post?.created_at)}</span>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base">{bigPost?.post?.caption}</p>
          {bigPost?.post?.image ? (
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
              <Image
                //@ts-expect-error nvm
                src={post?.image}
                alt="post image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : null}
          <div className="flex items-center justify-between text-xs gap-1 sm:gap-3 mt-2 pb-3 border-b">
            <VoteToPost
              singlePostMode={true}
              postId={post?.id}
              userId={userId}
              voteCountForNormalMode={null}
              voteCountForSinglePostMode={voteCountForSinglePostMode}
              postVotes={bigPost?.postVotes}
            />
            <RepostPost
              post={post}
              userId={userId}
              originalPostId={post.isRepost ? post.original_post?.id : post?.id}
              repostingUserId={userId}
              isRepostedByUser={bigPost?.isRepostedByUser}
            />
            <ReplyToPostDialog
              userId={userId}
              userImage={personalInfo?.imageUrl}
              bigPost={bigPost}
              singlePostMode={true}
              explicitPostId={null}
            />
            <PostOptions
              user={post.isRepost ? post.original_post?.users : post.users}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              userId={userId}
              postId={post.isRepost ? post.original_post?.id : post.id}
              post={post.isRepost ? post.original_post : post}
              isPostBookmarkedByUser={bigPost.isBookmarkedByUser}
            />
          </div>
          <ReplyToPost
            explicitPostId={null}
            singlePostMode={true}
            userId={userId}
            userImage={personalInfo?.imageUrl}
            bigPost={bigPost}
          />
          <div className="flex flex-col gap-7 divide-y">
            {bigPost?.comments.map((comment: CommentBigPost) => (
              <CaptionCardMini
                key={comment?.id}
                singlePostMode={true}
                comment={comment}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
            ))}
          </div>
        </div>
      </article>
    );

  return (
    <article
      className={`${
        rounded
          ? "caption-card-rounded sm:rounded-lg w-full md:w-[95%] p-3 sm:p-5 sm:border-2"
          : "w-full p-3 sm:p-5 caption-card-not-rounded"
      }  bg-card h-fit border-b-2 hover:bg-muted/40 relative `}
    >
      <Link
        href={`/${
          post.isRepost
            ? post.original_post?.users.userName
            : post?.users?.userName
        }/status/${post.isRepost ? post.original_post?.id : post?.id}`}
        className="absolute inset-0 z-10"
      ></Link>
      {post?.isRepost ? (
        <div className="flex items-center w-fit text-muted-foreground gap-1 mb-3 text-xs z-20 relative">
          <RefreshCcw className="w-4 h-4" />
          <Link
            href={`/profile/${post.users.clerkUserId}`}
            className="flex gap-[3px] hover:underline cursor-pointer"
          >
            {post.users.firstName} {""}
            {post.users.lastName}
            {""} reposted
          </Link>
        </div>
      ) : null}

      <div className="flex gap-3">
        <UserAvatarWithHover
          user={post.isRepost ? post.original_post?.users : post?.users}
          userId={userId}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2 flex-wrap">
              <UserNameWithHover
                user={post.isRepost ? post.original_post?.users : post?.users}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />
              <UserUserNameWithHover
                user={post.isRepost ? post.original_post?.users : post?.users}
                userId={userId}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              />

              <div className="text-muted-foreground text-xs text-center line-clamp-1 ">
                <span className="dot me-1"></span>
                <span className="">
                  {getRelativeTime(
                    post.isRepost
                      ? post.original_post?.created_at
                      : post?.created_at
                  )}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base">
            {post.isRepost ? post.original_post?.caption : post?.caption}
          </p>
          {post?.image ? (
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="post image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : null}
          {post?.original_post?.image ? (
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
              <Image
                src={post.original_post?.image}
                alt="post image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : null}

          <div className="flex items-center justify-between text-xs gap-1 sm:gap-3 mt-2">
            <VoteToPost
              voteCountForSinglePostMode={null}
              singlePostMode={false}
              postId={post.isRepost ? post.original_post?.id : post?.id}
              userId={userId}
              voteCountForNormalMode={voteCountForNormalMode}
              postVotes={
                post.isRepost ? post.original_post?.postVotes : post?.postVotes
              }
            />
            <RepostPost
              post={post}
              userId={userId}
              originalPostId={post.isRepost ? post.original_post?.id : post?.id}
              repostingUserId={userId}
              isRepostedByUser={false}
            />
            <ReplyToPostDialog
              post={post.isRepost ? post.original_post : post}
              userId={userId}
              userImage={userImage}
              singlePostMode={false}
              explicitPostId={post.isRepost ? post.original_post?.id : post?.id}
            />
            <PostOptions
              user={post.isRepost ? post.original_post?.users : post.users}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
              userId={userId}
              postId={post.isRepost ? post.original_post?.id : post.id}
              post={post.isRepost ? post.original_post : post}
              isPostBookmarkedByUser={post.isBookmarkedByUser}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
