export const locales = ["pt-BR", "en"] as const;
export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export type Publishable = {
  id: string;
  sortOrder: number;
  published: boolean;
};

export type ModuleFeature = Publishable & {
  moduleId: string;
  title: LocalizedText;
  description: LocalizedText;
  badge: string;
};

export type BotModule = Publishable & {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  icon: string;
  accent: string;
  features: ModuleFeature[];
};

export type ShowcaseItem = Publishable & {
  type: "benefit" | "case" | "process";
  title: LocalizedText;
  summary: LocalizedText;
  metricLabel: LocalizedText;
  metricValue: string;
};

export type Testimonial = Publishable & {
  name: string;
  role: LocalizedText;
  quote: LocalizedText;
};

export type FaqItem = Publishable & {
  question: LocalizedText;
  answer: LocalizedText;
};

export type SiteSettings = {
  discordUrl: string;
  heroEyebrow: LocalizedText;
  heroTitle: LocalizedText;
  heroSubtitle: LocalizedText;
  primaryCta: LocalizedText;
  secondaryCta: LocalizedText;
  finalTitle: LocalizedText;
  finalSubtitle: LocalizedText;
};

export type LandingContent = {
  modules: BotModule[];
  showcase: ShowcaseItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  settings: SiteSettings;
};
