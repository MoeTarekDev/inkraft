import AuthGradient from "@/components/AuthGradient";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function page() {
  return (
    <section className="flex m-5 w-full rounded-xl p-5 bg-card border-2 md:w-[90%] mx-5 md:mx-auto">
      <div className=" rounded-l-xl w-full md:w-1/2 relative flex flex-col items-center bg-background p-5">
        <h1 className="font-bold text-xl self-start ms-[24px] sm:ms-[40px]">
          <Link href="/sign-in">Inkraft</Link>
        </h1>
        <SignIn />
      </div>
      <AuthGradient />
    </section>
  );
}
