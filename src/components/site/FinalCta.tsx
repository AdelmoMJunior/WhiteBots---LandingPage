"use client";

import {useEffect, useRef} from "react";
import {ArrowRight} from "lucide-react";
import {TrackedDiscordLink} from "@/components/analytics/TrackedDiscordLink";
import {trackEvent} from "@/components/analytics/events";
import {localized} from "@/lib/localized";
import type {Locale, SiteSettings} from "@/types/content";

export function FinalCta({settings, locale}: {settings: SiteSettings; locale: Locale}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("final_cta_impression", {locale});
          observer.disconnect();
        }
      },
      {threshold: 0.45}
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [locale]);

  return (
    <section ref={ref} className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/12 bg-silver-50 text-graphite-950 shadow-panel">
        <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-deep">
              WhiteBots
            </p>
            <h2 className="text-balance mt-4 font-display text-4xl font-black tracking-[-0.025em] md:text-5xl">
              {localized(settings.finalTitle, locale)}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite-700">
              {localized(settings.finalSubtitle, locale)}
            </p>
          </div>
          <TrackedDiscordLink
            href={settings.discordUrl}
            eventLocation="final"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-black text-white transition hover:bg-graphite-800"
          >
            {localized(settings.primaryCta, locale)}
            <ArrowRight className="h-4 w-4" />
          </TrackedDiscordLink>
        </div>
      </div>
    </section>
  );
}
