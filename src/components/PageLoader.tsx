"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });
export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (!isNavigating) {
      NProgress.start();
      setIsNavigating(true);
    }

    const timeoutId = setTimeout(() => {
      NProgress.done();
      setIsNavigating(false);
    }, 300); // Short delay to ensure the progress bar is shown

    return () => {
      clearTimeout(timeoutId); // Clean up timeout on unmount or next navigation
    };
  }, [pathname, searchParams]);
  return null;
}
