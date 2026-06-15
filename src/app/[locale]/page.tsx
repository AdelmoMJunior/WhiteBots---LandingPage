import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getDictionary} from "@/i18n/dictionaries";
import {getLandingContent} from "@/lib/content";
import {locales, type Locale} from "@/types/content";
import {LandingPage} from "@/components/site/LandingPage";

export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : "pt-BR";
  const content = await getLandingContent();

  return {
    title:
      safeLocale === "pt-BR"
        ? "Bots Discord personalizados"
        : "Custom Discord bots",
    description: content.settings.heroSubtitle[safeLocale],
    alternates: {
      canonical: `/${safeLocale}`,
      languages: {
        "pt-BR": "/pt-BR",
        en: "/en"
      }
    }
  };
}

export default async function LocaleHome({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const [content, dictionary] = await Promise.all([
    getLandingContent(),
    Promise.resolve(getDictionary(safeLocale))
  ]);

  return <LandingPage content={content} dictionary={dictionary} locale={safeLocale} />;
}
