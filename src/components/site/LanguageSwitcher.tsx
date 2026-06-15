"use client";

import {usePathname} from "next/navigation";
import {trackEvent} from "@/components/analytics/events";
import type {Locale} from "@/types/content";

const labels: Record<Locale, string> = {
  "pt-BR": "PT",
  en: "EN"
};

export function LanguageSwitcher({locale}: {locale: Locale}) {
  const pathname = usePathname();

  return (
    <div
      className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
      aria-label="Language"
    >
      {(["pt-BR", "en"] as const).map((targetLocale) => {
        const href = pathname.replace(/^\/(pt-BR|en)/, `/${targetLocale}`);
        const active = locale === targetLocale;

        return (
          <a
            key={targetLocale}
            href={href}
            className={`focus-ring rounded-full px-3 py-1.5 text-xs font-bold transition ${
              active
                ? "bg-silver-50 text-graphite-950"
                : "text-silver-300 hover:text-silver-50"
            }`}
            hrefLang={targetLocale}
            onClick={() => trackEvent("language_switch", {target_locale: targetLocale})}
          >
            {labels[targetLocale]}
          </a>
        );
      })}
    </div>
  );
}
