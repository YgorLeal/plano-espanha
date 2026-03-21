"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const copy = {
  pt: { question: "Este conteúdo foi útil?", helpful: "Sim", notHelpful: "Não", thankYou: "Obrigado pelo feedback!" },
  es: { question: "¿Te resultó útil?", helpful: "Sí", notHelpful: "No", thankYou: "¡Gracias por tu opinión!" },
  en: { question: "Was this helpful?", helpful: "Yes", notHelpful: "No", thankYou: "Thanks for your feedback!" },
};

const countLabel = {
  pt: "pessoas acharam útil",
  es: "personas lo encontraron útil",
  en: "people found this helpful",
};

type ReactionType = "helpful" | "not_helpful";

type Counts = {
  helpful: number;
  not_helpful: number;
};

export default function ContentFeedback({ slug, lang }: { slug: string; lang: Locale }) {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [reacted, setReacted] = useState<ReactionType | null>(null);

  const sessionKey = `reacted:${slug}`;

  useEffect(() => {
    const stored = sessionStorage.getItem(sessionKey);
    if (stored === "helpful" || stored === "not_helpful") {
      setReacted(stored);
    }

    fetch(`/api/reactions/${slug}`)
      .then((r) => r.json())
      .then((data) => setCounts(data))
      .catch(() => {});
  }, [slug, sessionKey]);

  const handleReact = (type: ReactionType) => {
    if (reacted) return;

    fetch(`/api/reactions/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    })
      .then((r) => r.json())
      .then((data) => setCounts(data))
      .catch(() => {});

    sessionStorage.setItem(sessionKey, type);
    setReacted(type);
  };

  const t = copy[lang];
  const hasReacted = reacted !== null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
      {hasReacted ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{t.thankYou}</p>
          {counts !== null && (
            <p className="text-xs text-gray-400">
              {counts.helpful.toLocaleString(lang)} {countLabel[lang]}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-4">{t.question}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleReact("helpful")}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-600 ${
                reacted === "helpful" ? "border-brand-600 bg-brand-50 text-brand-600" : "border-gray-300 text-gray-700"
              }`}
            >
              <span>👍</span>
              {t.helpful}
            </button>
            <button
              onClick={() => handleReact("not_helpful")}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-600 ${
                reacted === "not_helpful" ? "border-brand-600 bg-brand-50 text-brand-600" : "border-gray-300 text-gray-700"
              }`}
            >
              <span>👎</span>
              {t.notHelpful}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
