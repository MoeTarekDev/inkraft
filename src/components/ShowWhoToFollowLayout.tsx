import WhoToFollow from "./WhoToFollow";

export default function ShowWhoToFollowLayout({
  showWhoToFollow,
  children,
  className,
}: {
  showWhoToFollow: boolean;
  children: any;
  className: any;
}) {
  return (
    <>
      <section
        className={`grid grid-cols-12 w-full h-full space-x-4 sm:mt-0 self-start ${className}`}
      >
        {children}

        {showWhoToFollow && (
          <aside className="col-span-4 hidden lg:block self-start mt-2">
            <WhoToFollow loggedInUserFollowedUsers={null} />
          </aside>
        )}
      </section>
    </>
  );
}
