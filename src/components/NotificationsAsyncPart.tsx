import { fetchNotificationsForUser, getFollowedUsers } from "@/lib/users";
import NotificationCmmented from "./NotificationCmmented";
import NotificationFollow from "./NotificationFollow";
import NotificationVoted from "./NotificationVoted";
import NotificationsPageInfiniteLoading from "./NotificationsPageInfiniteLoading";

export default async function NotificationsAsyncPart({ info }: { info: any }) {
  const [notifications, loggedInUserFollowedUsers] = await Promise.all([
    fetchNotificationsForUser(info?.id, 0, 10),
    getFollowedUsers(info?.id),
  ]);
  const notificationsType = {
    follow: NotificationFollow,
    vote: NotificationVoted,
    comment: NotificationCmmented,
  };

  return (
    <>
      {notifications && notifications.length && notifications?.length > 0 ? (
        <div className="pt-0 flex flex-col w-full border-r h-full">
          {notifications?.map((notification: any) => {
            const Component = notificationsType[notification.type];
            return Component ? (
              <Component
                key={notification.id}
                userId={info?.id}
                loggedInUserFollowedUsers={loggedInUserFollowedUsers}
                notification={{ ...notification }}
              />
            ) : null;
          })}
          <NotificationsPageInfiniteLoading
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            notificationsType={notificationsType}
          />
        </div>
      ) : (
        <div className="max-w-[400px] mt-11 flex items-center justify-center self-center px-5 w-full">
          <p className="text-3xl">No notifications here — yet ...</p>
        </div>
      )}
    </>
  );
}
