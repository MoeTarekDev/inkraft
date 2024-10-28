import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};
function NotFound() {
  return (
    <div className="text-center space-y-6 mt-4 container px-5 mx-auto py-12">
      <h1 className="text-3xl font-semibold text-primary-100 text-center">
        This account doesn’t exist
      </h1>
      <span className="text-sm text-muted-foreground">
        try searching for another.
      </span>
    </div>
  );
}

export default NotFound;
