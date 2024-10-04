"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

const ProgressProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="hsl(var(--primary))"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;
