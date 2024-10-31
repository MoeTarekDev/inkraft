import { getPostComments } from "@/lib/users";
import UserAvatarWithHover from "./UserAvatarWithHover";
import UserNameWithHover from "./UserNameWithHover";
import UserUserNameWithHover from "./UserUserNameWithHover";
import { getRelativeTime } from "@/lib/features";

export default async function PostComments({
  postId,
  loggedInUserFollowedUsers,
  userId,
}: any) {
  const comments = await getPostComments(postId);
  if (!comments || comments.length === 0) return null;
  return (
    <div className="flex flex-col gap-7 divide-y">
      {comments.map((comment) => (
        <PostComment
          key={comment.id}
          comment={comment}
          userId={userId}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      ))}
    </div>
  );
}

async function PostComment({
  comment,
  loggedInUserFollowedUsers,
  userId,
}: any) {
  return (
    <article className="bg-card w-full flex gap-3 h-fit pt-5">
      <div className="w-full flex flex-col flex-wrap">
        <div className="flex items-center gap-3 ">
          <UserAvatarWithHover
            user={comment?.users}
            userId={userId}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
          />
          <div className="flex items-center text-sm lg:flex gap-1 sm:gap-2">
            <UserNameWithHover
              user={comment?.users}
              userId={userId}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
            <UserUserNameWithHover
              user={comment?.users}
              userId={userId}
              loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            />
            <div className=" flex items-center gap-1 line-clamp-1">
              <span className="dot"></span>
              <span className="text-muted-foreground text-xs">
                {getRelativeTime(comment?.created_at)}
              </span>
            </div>
          </div>
        </div>
        <p className="ms-[47px]">{comment?.content}</p>
      </div>
    </article>
  );
}
