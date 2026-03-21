"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  pt: "visualizações",
  es: "visitas",
  en: "views",
};

export default function ViewCounter({ slug, lang }: { slug: string; lang: Locale }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = `viewed:${slug}`;
    const alreadyViewed = sessionStorage.getItem(sessionKey);

    if (alreadyViewed) {
      fetch(`/api/views/${slug}`)
        .then((r) => r.json())
        .then((data) => setViews(data.views))
        .catch(() => {});
    } else {
      fetch(`/api/views/${slug}`, { method: "POST" })
        .then((r) => r.json())
        .then((data) => {
          setViews(data.views);
          sessionStorage.setItem(sessionKey, "1");
        })
        .catch(() => {});
    }
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
      {views.toLocaleString(lang)} {labels[lang]}
    </span>
  );
}
