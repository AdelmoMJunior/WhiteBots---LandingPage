import {defineRouting} from "next-intl/routing";
import {locales} from "@/types/content";

export const routing = defineRouting({
  locales,
  defaultLocale: "pt-BR",
  localePrefix: "always"
});
