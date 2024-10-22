import BottomBarClient from "./BottomBarClient";
import Find from "./Find";
import NotificationLinkAndCount from "./NotificationLinkAndCount";

export default async function BottomBar({
  unreadNotificationsCount,
}: {
  unreadNotificationsCount: number;
}) {
  return (
    <BottomBarClient>
      <Find />
      <NotificationLinkAndCount
        isBottomBarActivated={true}
        unreadNotificationsCount={unreadNotificationsCount}
      />
    </BottomBarClient>
  );
}
