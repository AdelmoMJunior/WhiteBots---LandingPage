"use client";

import {useMemo, useState} from "react";
import {
  BadgeDollarSign,
  Bot,
  MessagesSquare,
  Shield,
  Sparkles,
  Workflow
} from "lucide-react";
import {trackEvent} from "@/components/analytics/events";
import {localized} from "@/lib/localized";
import type {Dictionary} from "@/i18n/dictionaries";
import type {BotModule, Locale} from "@/types/content";

const iconMap = {
  Shield,
  MessagesSquare,
  BadgeDollarSign,
  Workflow,
  Sparkles,
  Bot
};

type ModulesExplorerProps = {
  modules: BotModule[];
  dictionary: Dictionary;
  locale: Locale;
};

export function ModulesExplorer({modules, dictionary, locale}: ModulesExplorerProps) {
  const [selectedId, setSelectedId] = useState(modules[0]?.id);
  const selected = useMemo(
    () => modules.find((module) => module.id === selectedId) ?? modules[0],
    [modules, selectedId]
  );

  if (!selected) {
    return null;
  }

  return (
    <section id="modules" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-pulse">
              {dictionary.sections.modulesEyebrow}
            </p>
            <h2 className="text-balance mt-4 font-display text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
              {dictionary.sections.modulesTitle}
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-silver-300">
              {dictionary.sections.modulesSubtitle}
            </p>
            <div className="mt-8 grid gap-3">
              {modules.map((module) => {
                const Icon = iconMap[module.icon as keyof typeof iconMap] ?? Bot;
                const active = module.id === selected.id;

                return (
                  <button
                    key={module.id}
                    type="button"
                    className={`focus-ring rounded-lg border p-4 text-left transition ${
                      active
                        ? "border-violet-pulse/60 bg-violet-deep/20 shadow-violet-soft"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                    onClick={() => {
                      setSelectedId(module.id);
                      trackEvent("module_select", {module_slug: module.slug});
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                        <Icon className="h-5 w-5" style={{color: module.accent}} />
                      </span>
                      <span>
                        <span className="block font-bold text-white">
                          {localized(module.title, locale)}
                        </span>
                        <span className="mt-1 block text-sm text-silver-400">
                          {localized(module.summary, locale)}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="metal-panel relative overflow-hidden rounded-lg p-6 sm:p-8">
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{background: selected.accent}}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-silver-500">
                  {selected.slug}
                </p>
                <h3 className="mt-3 font-display text-4xl font-black text-white">
                  {localized(selected.title, locale)}
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-300">
                  {localized(selected.description, locale)}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-silver-200">
                {selected.published ? dictionary.labels.published : dictionary.labels.draft}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selected.features.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-lg border border-white/10 bg-graphite-950/45 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-pulse">
                      {dictionary.labels.moduleFeature}
                    </p>
                    {feature.badge ? (
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-bold text-silver-300">
                        {feature.badge}
                      </span>
                    ) : null}
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-white">
                    {localized(feature.title, locale)}
                  </h4>
                  <p className="mt-3 leading-7 text-silver-300">
                    {localized(feature.description, locale)}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
