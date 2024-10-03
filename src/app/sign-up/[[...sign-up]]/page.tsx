import AuthGradient from "@/components/AuthGradient";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="flex m-5 w-full rounded-xl p-5 bg-card border-2 lg:w-[80%] h-[700px] lg:mx-auto">
      <div className=" rounded-l-xl w-full md:w-1/2 relative flex flex-col items-center bg-background p-5">
        <h1 className="font-bold text-xl self-start ms-[24px] sm:ms-[40px]">
          <Link href="/sign-up">Inkraft</Link>
        </h1>
        <SignUp />
      </div>
      <AuthGradient />
    </section>
  );
}
