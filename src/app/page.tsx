"use client";

import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    const language = navigator.language.toLowerCase();
    const locale = language.includes("es")
      ? "es"
      : language.includes("en")
      ? "en"
      : "pt";

    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-600 mb-4">
          Plano Espanha
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Redirecionando para o idioma principal
        </h1>
        <p className="text-gray-600 mb-6">
          Se o redirecionamento não acontecer automaticamente, acesse a
          versão em português.
        </p>
        <a
          href="/pt/"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Ir para /pt/
        </a>
      </div>
    </main>
  );
}
