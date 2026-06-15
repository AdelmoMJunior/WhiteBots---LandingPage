import {describe, expect, it} from "vitest";
import {asLocalizedText, boolFromForm, localized, numberFromForm} from "@/lib/localized";

describe("localized helpers", () => {
  it("falls back to pt-BR when the selected locale is empty", () => {
    expect(localized({"pt-BR": "Olá", en: ""}, "en")).toBe("Olá");
  });

  it("normalizes unknown JSON into localized text", () => {
    expect(asLocalizedText({"pt-BR": "Farm"})).toEqual({"pt-BR": "Farm", en: ""});
    expect(asLocalizedText(null, "fallback")).toEqual({"pt-BR": "fallback", en: "fallback"});
  });

  it("parses primitive values from FormData", () => {
    const formData = new FormData();
    formData.set("published", "on");
    formData.set("sort_order", "42");

    expect(boolFromForm(formData, "published")).toBe(true);
    expect(numberFromForm(formData, "sort_order")).toBe(42);
    expect(numberFromForm(formData, "missing", 7)).toBe(7);
  });
});
