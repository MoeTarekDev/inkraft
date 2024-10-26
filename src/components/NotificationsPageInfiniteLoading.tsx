"use client";
import { fetchNotificationsForUser } from "@/lib/users";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
export default function NotificationsPageInfiniteLoading({
  loggedInUserFollowedUsers,
  notificationsType,
}: any) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const info = useUser();
  const limit = 10;
  useEffect(() => {
    if (inView && hasMore) {
      const getNotifications = async () => {
        const notifications = await fetchNotificationsForUser(
          info?.user?.id,
          offset,
          limit
        );
        if (
          notifications &&
          notifications.length &&
          notifications?.length > 0
        ) {
          setData([...data, ...notifications]);
          setOffset((prev) => prev + 10);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      };
      getNotifications();
    }
  }, [inView, info.user?.id, data, hasMore, offset]);
  return (
    <>
      {data?.map((notification: any) => {
        const Component = notificationsType[notification.type];
        return Component ? (
          <Component
            key={notification.id}
            userId={info?.user?.id}
            loggedInUserFollowedUsers={loggedInUserFollowedUsers}
            notification={{ ...notification }}
          />
        ) : null;
      })}
      {hasMore && <div ref={ref} className="loader self-center mb-3"></div>}
    </>
  );
}
