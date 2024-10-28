"use client";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: any) {
  return (
    <div className="flex justify-center items-center flex-col gap-6 container mx-auto px-5 py-12 text-primary-100">
      <h1 className="text-3xl font-semibold text-center">
        Something went wrong!
      </h1>
      <p className="text-lg">{error.message}</p>

      <Button className="inline-block" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
