import { ourFileRouter } from "@/app/api/uploadthing/core";
import ProgressProvider from "@/components/ProgressBarProvider";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Toaster } from "@/components/ui/toaster";
import {
  fetchNotificationsForUser,
  getFollowedUsers,
  getUserFollowers,
} from "@/lib/users";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";
import BottomBarContainer from "@/components/BottomBarContainer";
const brockMann = localFont({
  src: "../fonts/brockmann-medium-webfont.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s / inkraft",
    default: "inkraft",
  },
  description:
    "Discover trending posts, engage with the community, and explore fresh content tailored to your interests on the home page of Inkraft.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const info: any = await currentUser();
  const followedUsers: any = await getFollowedUsers(info?.id);
  const myFollowers: any = await getUserFollowers(info?.id);
  const notifications = await fetchNotificationsForUser(info?.id, 0, 1000);

  const unreadNotificationsCount =
    notifications?.filter((notification) => {
      return notification.read === false;
    }).length || 0;

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body
          className={`${brockMann.className} antialiased bg-background min-h-[calc(100vh-56px)] sm:min-h-screen`}
        >
          <div className="container mx-auto sm:px-2 sm:flex sm:flex-row mb-[56px] sm:mb-0 h-full bg-background">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <ProgressProvider>
                <SignedIn>
                  <TopBar
                    firstName={info?.firstName}
                    lastName={info?.lastName}
                    userName={info?.username}
                    userId={info?.id}
                    myFollowers={myFollowers}
                    followedUsers={followedUsers}
                    userImage={info?.imageUrl}
                  />
                  <Sidebar
                    firstName={info?.firstName}
                    lastName={info?.lastName}
                    userName={info?.username}
                    userId={info?.id}
                    userImage={info?.imageUrl}
                    unreadNotificationsCount={unreadNotificationsCount}
                  />
                  <BottomBarContainer
                    unreadNotificationsCount={unreadNotificationsCount}
                    userImage={info?.imageUrl}
                  />
                </SignedIn>
                <main className="bg-background w-full min-h-[calc(100vh-56px)] sm:min-h-screen">
                  {children}
                </main>
                <Toaster />
              </ProgressProvider>
            </ThemeProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
