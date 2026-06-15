import type {Locale, LocalizedText} from "@/types/content";

export function localized(value: LocalizedText | undefined, locale: Locale) {
  if (!value) {
    return "";
  }

  return value[locale] || value["pt-BR"] || value.en || "";
}

export function asLocalizedText(value: unknown, fallback = ""): LocalizedText {
  if (value && typeof value === "object") {
    const record = value as Partial<Record<Locale, unknown>>;

    return {
      "pt-BR": typeof record["pt-BR"] === "string" ? record["pt-BR"] : fallback,
      en: typeof record.en === "string" ? record.en : fallback
    };
  }

  return {"pt-BR": fallback, en: fallback};
}

export function localizedFromForm(formData: FormData, field: string): LocalizedText {
  return {
    "pt-BR": String(formData.get(`${field}_pt`) || "").trim(),
    en: String(formData.get(`${field}_en`) || "").trim()
  };
}

export function boolFromForm(formData: FormData, field: string) {
  return formData.get(field) === "on";
}

export function numberFromForm(formData: FormData, field: string, fallback = 0) {
  const raw = formData.get(field);

  if (raw === null || raw === "") {
    return fallback;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? value : fallback;
}
