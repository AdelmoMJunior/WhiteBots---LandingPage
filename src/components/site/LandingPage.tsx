import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  ServerCog,
  Sparkles,
  Workflow
} from "lucide-react";
import {TrackedDiscordLink} from "@/components/analytics/TrackedDiscordLink";
import {LanguageSwitcher} from "@/components/site/LanguageSwitcher";
import {LogoAssemblySection} from "@/components/site/LogoAssemblySection";
import {ModulesExplorer} from "@/components/site/ModulesExplorer";
import {FinalCta} from "@/components/site/FinalCta";
import {localized} from "@/lib/localized";
import type {Dictionary} from "@/i18n/dictionaries";
import type {LandingContent, Locale} from "@/types/content";

type LandingPageProps = {
  content: LandingContent;
  dictionary: Dictionary;
  locale: Locale;
};

export function LandingPage({content, dictionary, locale}: LandingPageProps) {
  const settings = content.settings;
  const processItems = [
    {
      icon: Workflow,
      title: locale === "pt-BR" ? "Mapeamento real do fluxo" : "Real workflow mapping",
      body:
        locale === "pt-BR"
          ? "O escopo começa pelo que sua staff faz hoje, onde perde tempo e quais permissões precisam ser respeitadas."
          : "Scope starts from what your staff does today, where time is lost and which permissions must be respected."
    },
    {
      icon: ServerCog,
      title: locale === "pt-BR" ? "Construção sob medida" : "Custom build",
      body:
        locale === "pt-BR"
          ? "Módulos, comandos, painéis, logs e estados são desenhados para parecer parte nativa do servidor."
          : "Modules, commands, panels, logs and states are designed to feel native to the server."
    },
    {
      icon: LockKeyhole,
      title: locale === "pt-BR" ? "Segurança e evolução" : "Security and evolution",
      body:
        locale === "pt-BR"
          ? "Validação server-side, auditoria e base preparada para novos módulos sem quebrar a experiência."
          : "Server-side validation, auditing and a foundation ready for new modules without breaking experience."
    }
  ];

  return (
    <main className="bg-graphite-950 text-silver-50">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-graphite-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href={`/${locale}`} className="focus-ring flex items-center gap-3 rounded-full">
            <Image
              src="/brand/whitebots-logo.png"
              width={44}
              height={44}
              alt="WhiteBots"
              priority
              className="rounded-full"
            />
            <span className="font-display text-lg font-bold tracking-wide">WhiteBots</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-semibold text-silver-300 md:flex">
            <Link href="#modules" className="transition hover:text-silver-50">
              {dictionary.nav.modules}
            </Link>
            <Link href="#process" className="transition hover:text-silver-50">
              {dictionary.nav.process}
            </Link>
            <Link href="#proof" className="transition hover:text-silver-50">
              {dictionary.nav.proof}
            </Link>
            <Link href="#faq" className="transition hover:text-silver-50">
              {dictionary.nav.faq}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <TrackedDiscordLink
              href={settings.discordUrl}
              eventLocation="header"
              className="focus-ring hidden rounded-full bg-silver-50 px-4 py-2 text-sm font-bold text-graphite-950 transition hover:bg-white sm:inline-flex"
            >
              Discord
            </TrackedDiscordLink>
          </div>
        </nav>
      </header>

      <section className="relative min-h-screen px-5 pt-32 sm:px-8 lg:pt-36">
        <div className="absolute inset-0 fine-grid opacity-45" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-pulse/60 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-violet-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              {localized(settings.heroEyebrow, locale)}
            </div>
            <h1 className="text-balance mt-7 font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              {localized(settings.heroTitle, locale)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-silver-300 sm:text-xl">
              {localized(settings.heroSubtitle, locale)}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedDiscordLink
                href={settings.discordUrl}
                eventLocation="hero"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-silver-50 px-6 py-3 text-sm font-black text-graphite-950 transition hover:bg-white"
              >
                {localized(settings.primaryCta, locale)}
                <ArrowRight className="h-4 w-4" />
              </TrackedDiscordLink>
              <Link
                href="#modules"
                className="focus-ring inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-silver-100 transition hover:border-white/30 hover:bg-white/[0.04]"
              >
                {localized(settings.secondaryCta, locale)}
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                locale === "pt-BR" ? "Sob medida" : "Tailored",
                locale === "pt-BR" ? "Seguro" : "Secure",
                locale === "pt-BR" ? "Evolutivo" : "Evolving"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-silver-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-violet-pulse" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <div className="absolute inset-8 rounded-full border border-white/10 bg-white/[0.025]" />
            <div className="absolute inset-0 rounded-full border border-violet-pulse/20 shadow-violet-soft" />
            <Image
              src="/brand/whitebots-logo.png"
              alt="WhiteBots robot logo"
              width={720}
              height={720}
              priority
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_32px_80px_rgba(139,92,246,0.22)]"
            />
          </div>
        </div>
      </section>

      <ModulesExplorer
        modules={content.modules}
        dictionary={dictionary}
        locale={locale}
      />

      <LogoAssemblySection dictionary={dictionary} />

      <section id="process" className="relative px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-pulse">
              {dictionary.sections.processEyebrow}
            </p>
            <h2 className="text-balance mt-4 font-display text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
              {dictionary.sections.processTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {processItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="metal-panel rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                      <Icon className="h-5 w-5 text-violet-pulse" />
                    </div>
                    <span className="font-display text-4xl font-black text-white/10">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-silver-300">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="proof" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-pulse">
                {dictionary.sections.proofEyebrow}
              </p>
              <h2 className="text-balance mt-4 font-display text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
                {dictionary.sections.proofTitle}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.showcase.map((item) => (
                <article key={item.id} className="metal-panel rounded-lg p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-silver-500">
                        {item.type}
                      </p>
                      <h3 className="mt-3 text-xl font-bold text-white">
                        {localized(item.title, locale)}
                      </h3>
                    </div>
                    <div className="rounded-lg border border-violet-pulse/30 bg-violet-deep/15 px-3 py-2 text-right">
                      <p className="font-display text-2xl font-black text-white">
                        {item.metricValue}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-violet-pulse">
                        {localized(item.metricLabel, locale)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 leading-7 text-silver-300">
                    {localized(item.summary, locale)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.testimonials.map((item) => (
              <figure key={item.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <blockquote className="text-lg leading-8 text-silver-100">
                  “{localized(item.quote, locale)}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-sm text-silver-400">{localized(item.role, locale)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-pulse">
              {dictionary.sections.faqEyebrow}
            </p>
            <h2 className="text-balance mt-4 font-display text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
              {dictionary.sections.faqTitle}
            </h2>
          </div>
          <div className="space-y-3">
            {content.faqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-white marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {localized(faq.question, locale)}
                    <span className="text-violet-pulse transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-silver-300">{localized(faq.answer, locale)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta settings={settings} locale={locale} />

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-silver-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WhiteBots. Todos os direitos reservados.</p>
          <p>Bots Discord personalizados para comunidades profissionais.</p>
        </div>
      </footer>
    </main>
  );
}
