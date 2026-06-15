"use client";

import {GoogleAnalytics} from "@next/third-parties/google";
import {usePathname} from "next/navigation";

export function AnalyticsProvider({gaId}: {gaId: string}) {
  const pathname = usePathname();

  if (!gaId || pathname.startsWith("/admin")) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
