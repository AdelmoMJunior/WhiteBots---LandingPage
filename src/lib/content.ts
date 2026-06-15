import {unstable_noStore as noStore} from "next/cache";
import {createSupabasePublicClient} from "@/lib/supabase/server";
import type {SupabaseClient} from "@supabase/supabase-js";
import {asLocalizedText} from "@/lib/localized";
import {seedContent} from "@/lib/seed-content";
import type {
  BotModule,
  FaqItem,
  LandingContent,
  ModuleFeature,
  ShowcaseItem,
  SiteSettings,
  Testimonial
} from "@/types/content";
import type {Database} from "@/types/database";

type Tables = Database["public"]["Tables"];

function toModule(row: Tables["modules"]["Row"], features: ModuleFeature[]): BotModule {
  return {
    id: row.id,
    slug: row.slug,
    title: asLocalizedText(row.title),
    summary: asLocalizedText(row.summary),
    description: asLocalizedText(row.description),
    icon: row.icon,
    accent: row.accent,
    sortOrder: row.sort_order,
    published: row.published,
    features
  };
}

function toFeature(row: Tables["module_features"]["Row"]): ModuleFeature {
  return {
    id: row.id,
    moduleId: row.module_id,
    title: asLocalizedText(row.title),
    description: asLocalizedText(row.description),
    badge: row.badge,
    sortOrder: row.sort_order,
    published: row.published
  };
}

function toShowcase(row: Tables["showcase_items"]["Row"]): ShowcaseItem {
  const type = ["benefit", "case", "process"].includes(row.type)
    ? (row.type as ShowcaseItem["type"])
    : "benefit";

  return {
    id: row.id,
    type,
    title: asLocalizedText(row.title),
    summary: asLocalizedText(row.summary),
    metricLabel: asLocalizedText(row.metric_label),
    metricValue: row.metric_value,
    sortOrder: row.sort_order,
    published: row.published
  };
}

function toTestimonial(row: Tables["testimonials"]["Row"]): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: asLocalizedText(row.role),
    quote: asLocalizedText(row.quote),
    sortOrder: row.sort_order,
    published: row.published
  };
}

function toFaq(row: Tables["faqs"]["Row"]): FaqItem {
  return {
    id: row.id,
    question: asLocalizedText(row.question),
    answer: asLocalizedText(row.answer),
    sortOrder: row.sort_order,
    published: row.published
  };
}

function toSettings(value: unknown): SiteSettings {
  if (!value || typeof value !== "object") {
    return seedContent.settings;
  }

  const settings = value as Partial<Record<keyof SiteSettings, unknown>>;

  return {
    discordUrl:
      typeof settings.discordUrl === "string" && settings.discordUrl
        ? settings.discordUrl
        : seedContent.settings.discordUrl,
    heroEyebrow: asLocalizedText(settings.heroEyebrow, seedContent.settings.heroEyebrow["pt-BR"]),
    heroTitle: asLocalizedText(settings.heroTitle, seedContent.settings.heroTitle["pt-BR"]),
    heroSubtitle: asLocalizedText(
      settings.heroSubtitle,
      seedContent.settings.heroSubtitle["pt-BR"]
    ),
    primaryCta: asLocalizedText(settings.primaryCta, seedContent.settings.primaryCta["pt-BR"]),
    secondaryCta: asLocalizedText(
      settings.secondaryCta,
      seedContent.settings.secondaryCta["pt-BR"]
    ),
    finalTitle: asLocalizedText(settings.finalTitle, seedContent.settings.finalTitle["pt-BR"]),
    finalSubtitle: asLocalizedText(
      settings.finalSubtitle,
      seedContent.settings.finalSubtitle["pt-BR"]
    )
  };
}

function sortByOrder<T extends {sortOrder: number}>(items: T[]) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getLandingContent(): Promise<LandingContent> {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return seedContent;
  }

  try {
    const [modulesResult, featuresResult, showcaseResult, testimonialsResult, faqsResult, settingsResult] =
      await Promise.all([
        supabase
          .from("modules")
          .select("*")
          .eq("published", true)
          .order("sort_order", {ascending: true}),
        supabase
          .from("module_features")
          .select("*")
          .eq("published", true)
          .order("sort_order", {ascending: true}),
        supabase
          .from("showcase_items")
          .select("*")
          .eq("published", true)
          .order("sort_order", {ascending: true}),
        supabase
          .from("testimonials")
          .select("*")
          .eq("published", true)
          .order("sort_order", {ascending: true}),
        supabase.from("faqs").select("*").eq("published", true).order("sort_order", {ascending: true}),
        supabase.from("site_settings").select("value").eq("key", "landing").maybeSingle()
      ]);

    if (
      modulesResult.error ||
      featuresResult.error ||
      showcaseResult.error ||
      testimonialsResult.error ||
      faqsResult.error
    ) {
      return seedContent;
    }

    const features = (featuresResult.data ?? []).map(toFeature);
    const featuresByModule = new Map<string, ModuleFeature[]>();

    features.forEach((feature) => {
      const current = featuresByModule.get(feature.moduleId) ?? [];
      current.push(feature);
      featuresByModule.set(feature.moduleId, current);
    });

    const modules = (modulesResult.data ?? []).map((row) =>
      toModule(row, sortByOrder(featuresByModule.get(row.id) ?? []))
    );

    return {
      modules: modules.length ? sortByOrder(modules) : seedContent.modules,
      showcase: (showcaseResult.data ?? []).map(toShowcase),
      testimonials: (testimonialsResult.data ?? []).map(toTestimonial),
      faqs: (faqsResult.data ?? []).map(toFaq),
      settings: toSettings(settingsResult.data?.value)
    };
  } catch {
    return seedContent;
  }
}

export async function getAdminContent(client?: SupabaseClient<Database> | null) {
  noStore();
  const supabase = client ?? createSupabasePublicClient();

  if (!supabase) {
    return seedContent;
  }

  const [modulesResult, featuresResult, showcaseResult, testimonialsResult, faqsResult, settingsResult] =
    await Promise.all([
      supabase.from("modules").select("*").order("sort_order", {ascending: true}),
      supabase.from("module_features").select("*").order("sort_order", {ascending: true}),
      supabase.from("showcase_items").select("*").order("sort_order", {ascending: true}),
      supabase.from("testimonials").select("*").order("sort_order", {ascending: true}),
      supabase.from("faqs").select("*").order("sort_order", {ascending: true}),
      supabase.from("site_settings").select("value").eq("key", "landing").maybeSingle()
    ]);

  if (modulesResult.error || featuresResult.error) {
    return seedContent;
  }

  const features = (featuresResult.data ?? []).map(toFeature);
  const featuresByModule = new Map<string, ModuleFeature[]>();

  features.forEach((feature) => {
    const current = featuresByModule.get(feature.moduleId) ?? [];
    current.push(feature);
    featuresByModule.set(feature.moduleId, current);
  });

  return {
    modules: (modulesResult.data ?? []).map((row) =>
      toModule(row, sortByOrder(featuresByModule.get(row.id) ?? []))
    ),
    showcase: (showcaseResult.data ?? []).map(toShowcase),
    testimonials: (testimonialsResult.data ?? []).map(toTestimonial),
    faqs: (faqsResult.data ?? []).map(toFaq),
    settings: toSettings(settingsResult.data?.value)
  };
}
