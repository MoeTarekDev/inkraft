import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "next-themes";
import "@theme-toggles/react/css/darkside.css";
import PageLoader from "@/components/PageLoader";

const brockMann = localFont({
  src: "../fonts/brockmann-medium-webfont.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${brockMann.className} antialiased flex`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PageLoader />
            <SignedIn>
              <Sidebar />
            </SignedIn>
            <main className="flex w-full min-h-screen bg-background">
              <div className="container mx-auto">{children}</div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
