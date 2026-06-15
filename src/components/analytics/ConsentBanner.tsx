"use client";

import {useEffect, useState} from "react";

const storageKey = "whitebots-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (saved === "granted") {
      updateConsent(true);
      return;
    }

    if (saved === "denied") {
      updateConsent(false);
      return;
    }

    setVisible(true);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-white/12 bg-graphite-900/95 p-4 shadow-panel backdrop-blur md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-silver-300">
          Usamos analytics para entender cliques e melhorar a experiência. Você pode negar e o
          site continuará funcionando normalmente.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            className="focus-ring rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-silver-100"
            onClick={() => {
              window.localStorage.setItem(storageKey, "denied");
              updateConsent(false);
              setVisible(false);
            }}
          >
            Recusar
          </button>
          <button
            type="button"
            className="focus-ring rounded-full bg-silver-50 px-4 py-2 text-sm font-bold text-graphite-950"
            onClick={() => {
              window.localStorage.setItem(storageKey, "granted");
              updateConsent(true);
              setVisible(false);
            }}
          >
            Permitir
          </button>
        </div>
      </div>
    </div>
  );
}
