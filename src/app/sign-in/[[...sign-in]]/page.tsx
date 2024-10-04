import AuthGradient from "@/components/AuthGradient";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function page() {
  return (
    <section className="flex test-no-margin rounded-xl p-5 bg-card border-2 w-[90%] h-[580px] my-5 mx-auto justify-center items-center">
      <div className=" rounded-l-xl w-full lg:w-1/2 relative flex flex-col items-center bg-background p-5">
        <h1 className="font-bold text-xl self-start ms-[24px] sm:ms-[40px]">
          <Link href="/sign-in">Inkraft</Link>
        </h1>
        <SignIn />
      </div>
      <AuthGradient />
    </section>
  );
}
