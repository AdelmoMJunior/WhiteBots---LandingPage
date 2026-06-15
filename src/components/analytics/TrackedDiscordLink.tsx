"use client";

import Link from "next/link";
import {trackEvent} from "@/components/analytics/events";

type TrackedDiscordLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  eventLocation: string;
};

export function TrackedDiscordLink({
  href,
  children,
  className,
  eventLocation
}: TrackedDiscordLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackEvent("discord_cta_click", {location: eventLocation})}
    >
      {children}
    </Link>
  );
}
