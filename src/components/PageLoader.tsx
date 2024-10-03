"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
//@ts-expect-error www
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isNavigating = useRef(false);

  useEffect(() => {
    if (!isNavigating.current) {
      NProgress.start();
      isNavigating.current = true;
    }

    const timeoutId = setTimeout(() => {
      NProgress.done();
      isNavigating.current = false;
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return null;
}
