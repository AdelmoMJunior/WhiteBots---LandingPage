"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import type {Dictionary} from "@/i18n/dictionaries";

function LogoFallback() {
  return (
    <div className="flex h-full min-h-[360px] items-center justify-center">
      <Image
        src="/brand/whitebots-logo.png"
        width={520}
        height={520}
        alt="WhiteBots"
        className="h-auto w-full max-w-[520px] drop-shadow-[0_30px_90px_rgba(139,92,246,0.25)]"
      />
    </div>
  );
}

const logoPieces = [
  {
    name: "head",
    clipPath: "inset(0% 0% 52% 0%)",
    x: 0,
    y: -92,
    rotate: -5,
    scale: 0.96
  },
  {
    name: "left-mark",
    clipPath: "inset(48% 64% 23% 0%)",
    x: -130,
    y: 14,
    rotate: -9,
    scale: 0.98
  },
  {
    name: "center-mark",
    clipPath: "inset(48% 36% 23% 23%)",
    x: -18,
    y: 64,
    rotate: 6,
    scale: 1.02
  },
  {
    name: "right-mark",
    clipPath: "inset(48% 0% 23% 54%)",
    x: 132,
    y: 18,
    rotate: 8,
    scale: 0.98
  },
  {
    name: "nameplate",
    clipPath: "inset(72% 0% 0% 0%)",
    x: 0,
    y: 112,
    rotate: 4,
    scale: 0.96
  }
];

const assemblyLogoSrc = "/brand/whitebots-logo-transparent.png";
const assemblyPiecesSrc = "/brand/whitebots-logo-pieces.png";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smooth(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function LogoAssemblyVisual({progress}: {progress: number}) {
  const assembled = smooth(progress);
  const finalBlend = smooth((progress - 0.74) / 0.26);

  return (
    <div className="relative mx-auto flex min-h-[58vh] w-full max-w-[720px] items-center justify-center px-4 lg:min-h-screen">
      <div
        className="relative aspect-square w-full max-w-[620px]"
        style={{perspective: "1100px"}}
        aria-hidden="true"
      >
        <Image
          src={assemblyLogoSrc}
          width={760}
          height={760}
          alt=""
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_34px_90px_rgba(139,92,246,0.28)]"
          style={{
            opacity: finalBlend,
            transform: `scale(${0.985 + finalBlend * 0.015})`
          }}
        />
        {logoPieces.map((piece, index) => {
          const delay = index * 0.035;
          const localProgress = smooth((progress - delay) / (1 - delay));
          const x = piece.x * (1 - localProgress);
          const y = piece.y * (1 - localProgress);
          const rotate = piece.rotate * (1 - localProgress);
          const scale = piece.scale + (1 - piece.scale) * localProgress;
          const depth = 150 * (1 - localProgress);

          return (
            <Image
              key={piece.name}
              src={assemblyPiecesSrc}
              width={760}
              height={760}
              alt=""
              className="absolute inset-0 h-full w-full object-contain will-change-transform"
              style={{
                clipPath: piece.clipPath,
                opacity: 1 - finalBlend,
                transform: `translate3d(${x}px, ${y}px, ${depth}px) rotate(${rotate}deg) scale(${scale})`
              }}
            />
          );
        })}
        <div
          className="absolute inset-x-[18%] bottom-[7%] h-3 rounded-full bg-black/50 blur-xl"
          style={{opacity: 0.42 + assembled * 0.22}}
        />
      </div>
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function LogoAssemblySection({
  dictionary
}: {
  dictionary: Dictionary;
}) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      const node = ref.current;

      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 1;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section ref={ref} className="relative h-[220vh] border-y border-white/10">
      <div className="sticky top-0 grid min-h-screen overflow-hidden bg-graphite-900 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative z-10 flex items-center px-5 py-24 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-pulse">
              {dictionary.sections.assemblyEyebrow}
            </p>
            <h2 className="text-balance mt-4 font-display text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
              {dictionary.sections.assemblyTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-silver-300">
              {dictionary.sections.assemblySubtitle}
            </p>
            {reducedMotion ? (
              <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm text-silver-400">
                {dictionary.labels.reducedMotion}
              </p>
            ) : null}
            <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-violet-pulse transition-[width]"
                style={{width: `${Math.round(progress * 100)}%`}}
              />
            </div>
          </div>
        </div>
        <div className="relative flex min-h-[58vh] items-center justify-center overflow-hidden lg:min-h-screen">
          <div className="absolute inset-0 fine-grid opacity-30" aria-hidden="true" />
          {reducedMotion ? <LogoFallback /> : <LogoAssemblyVisual progress={progress} />}
        </div>
      </div>
    </section>
  );
}
