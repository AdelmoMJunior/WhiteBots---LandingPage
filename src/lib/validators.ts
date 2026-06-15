import {z} from "zod";

export const localizedTextSchema = z.object({
  "pt-BR": z.string().trim().min(1, "Portuguese content is required").max(700),
  en: z.string().trim().min(1, "English content is required").max(700)
});

export const longLocalizedTextSchema = z.object({
  "pt-BR": z.string().trim().min(1).max(1600),
  en: z.string().trim().min(1).max(1600)
});

export const moduleSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase slugs with hyphens"),
  title: localizedTextSchema,
  summary: localizedTextSchema,
  description: longLocalizedTextSchema,
  icon: z.string().trim().min(2).max(40),
  accent: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/),
  sort_order: z.number().int().min(0).max(9999),
  published: z.boolean()
});

export const featureSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  module_id: z.string().uuid().or(z.string().min(1)),
  title: localizedTextSchema,
  description: longLocalizedTextSchema,
  badge: z.string().trim().max(24),
  sort_order: z.number().int().min(0).max(9999),
  published: z.boolean()
});

export const showcaseSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  type: z.enum(["benefit", "case", "process"]),
  title: localizedTextSchema,
  summary: longLocalizedTextSchema,
  metric_label: localizedTextSchema,
  metric_value: z.string().trim().min(1).max(24),
  sort_order: z.number().int().min(0).max(9999),
  published: z.boolean()
});

export const testimonialSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  name: z.string().trim().min(2).max(120),
  role: localizedTextSchema,
  quote: longLocalizedTextSchema,
  sort_order: z.number().int().min(0).max(9999),
  published: z.boolean()
});

export const faqSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  question: localizedTextSchema,
  answer: longLocalizedTextSchema,
  sort_order: z.number().int().min(0).max(9999),
  published: z.boolean()
});

export const siteSettingsSchema = z.object({
  discordUrl: z.string().trim().url(),
  heroEyebrow: localizedTextSchema,
  heroTitle: localizedTextSchema,
  heroSubtitle: longLocalizedTextSchema,
  primaryCta: localizedTextSchema,
  secondaryCta: localizedTextSchema,
  finalTitle: localizedTextSchema,
  finalSubtitle: longLocalizedTextSchema
});
