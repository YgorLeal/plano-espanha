"use client";

import Link from "next/link";
import { useState } from "react";
import { Locale } from "@/lib/i18n";

const labels: Record<Locale, { calc: string; visa: string; blog: string; cta: string }> = {
  pt: { calc: "Calculadora", visa: "Simulador de Visto", blog: "Blog", cta: "Calcule Grátis" },
  es: { calc: "Calculadora", visa: "Simulador de Visado", blog: "Blog", cta: "Calcula Gratis" },
  en: { calc: "Calculator", visa: "Visa Simulator", blog: "Blog", cta: "Calculate Free" },
};

const langNames: Record<Locale, string> = { pt: "PT", es: "ES", en: "EN" };

export default function Header({ lang }: { lang: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = labels[lang];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase font-heading">
            Plano<span className="text-brand-600">Espanha</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${lang}/calculadora`} className="text-[15px] font-semibold text-gray-700 hover:text-brand-600 transition-colors uppercase tracking-wide">
            {t.calc}
          </Link>
          <Link href={`/${lang}/simulador`} className="text-[15px] font-semibold text-gray-700 hover:text-brand-600 transition-colors uppercase tracking-wide">
            {t.visa}
          </Link>
          <Link href={`/${lang}/blog`} className="text-[15px] font-semibold text-gray-700 hover:text-brand-600 transition-colors uppercase tracking-wide">
            {t.blog}
          </Link>

          {/* Language switcher */}
          <div className="flex gap-0.5 bg-gray-100 p-1 rounded-md">
            {(["pt", "es", "en"] as Locale[]).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-all ${
                  l === lang
                    ? "bg-white text-brand-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {langNames[l]}
              </Link>
            ))}
          </div>

          <Link
            href={`/${lang}/calculadora`}
            className="bg-brand-600 text-white text-[13px] font-bold px-6 py-3 rounded hover:bg-brand-700 transition-all uppercase tracking-widest shadow-md hover:shadow-lg active:scale-95"
          >
            {t.cta}
          </Link>
        </nav>

        <button className="md:hidden p-2 text-gray-900" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href={`/${lang}/calculadora`} className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>{t.calc}</Link>
          <Link href={`/${lang}/simulador`} className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>{t.visa}</Link>
          <Link href={`/${lang}/blog`} className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>{t.blog}</Link>
          <div className="flex gap-2 pt-2">
            {(["pt", "es", "en"] as Locale[]).map((l) => (
              <Link key={l} href={`/${l}`} className={`text-sm font-medium px-3 py-1.5 rounded ${l === lang ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                {langNames[l]}
              </Link>
            ))}
          </div>
          <Link href={`/${lang}/calculadora`} className="block bg-brand-600 text-white text-center font-semibold px-5 py-2.5 rounded-lg" onClick={() => setMenuOpen(false)}>{t.cta}</Link>
        </nav>
      )}
    </header>
  );
}
