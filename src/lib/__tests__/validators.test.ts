import {describe, expect, it} from "vitest";
import {moduleSchema, siteSettingsSchema} from "@/lib/validators";

const localized = {"pt-BR": "Texto", en: "Text"};

describe("admin validators", () => {
  it("accepts a valid module payload", () => {
    const result = moduleSchema.safeParse({
      id: "",
      slug: "faccoes",
      title: localized,
      summary: localized,
      description: localized,
      icon: "Shield",
      accent: "#8b5cf6",
      sort_order: 1,
      published: true
    });

    expect(result.success).toBe(true);
  });

  it("rejects unsafe slugs and invalid colors", () => {
    const result = moduleSchema.safeParse({
      id: "",
      slug: "Facções!",
      title: localized,
      summary: localized,
      description: localized,
      icon: "Shield",
      accent: "purple",
      sort_order: 1,
      published: true
    });

    expect(result.success).toBe(false);
  });

  it("requires a valid Discord URL in settings", () => {
    const result = siteSettingsSchema.safeParse({
      discordUrl: "https://discord.gg/whitebots",
      heroEyebrow: localized,
      heroTitle: localized,
      heroSubtitle: localized,
      primaryCta: localized,
      secondaryCta: localized,
      finalTitle: localized,
      finalSubtitle: localized
    });

    expect(result.success).toBe(true);
  });
});
