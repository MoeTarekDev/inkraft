import BottomBarClient from "./BottomBarClient";
import Find from "./Find";
import NotificationLinkAndCount from "./NotificationLinkAndCount";

export default async function BottomBarContainer({
  unreadNotificationsCount,
  userImage,
}: {
  unreadNotificationsCount: number;
  userImage: string;
}) {
  return (
    <BottomBarClient userImage={userImage}>
      <Find />
      <NotificationLinkAndCount
        isBottomBarActivated={true}
        unreadNotificationsCount={unreadNotificationsCount}
      />
    </BottomBarClient>
  );
}
