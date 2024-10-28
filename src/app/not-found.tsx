import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Page not found",
};
function NotFound() {
  return (
    <div className="text-center space-y-6 mt-4 container px-5 mx-auto py-12">
      <h1 className="text-3xl font-semibold text-primary-100 text-center">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-primary text-primary-foreground px-6 py-3 text-lg hover:bg-primary/90 rounded-md transition-colors duration-300"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
