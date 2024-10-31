import AuthGradient from "@/components/AuthGradient";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="flex  rounded-xl lg:p-5 bg-card border-2 w-[90%] sm:h-[700px] my-5 mx-auto justify-center items-center">
      <div className=" rounded-l-xl w-full h-full lg:w-1/2 relative flex flex-col gap-3 items-center bg-background p-5 lg:py-0 ">
        <h1 className="font-bold text-xl self-start">
          <Link href="/sign-up">Inkraft</Link>
        </h1>
        <SignUp />
      </div>
      <AuthGradient />
    </section>
  );
}
