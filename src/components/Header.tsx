"use client";

import Link from "next/link";
import { useState } from "react";
import { Locale } from "@/lib/i18n";

const labels: Record<Locale, { about: string; calc: string; visa: string; blog: string; cta: string }> = {
  pt: { about: "Quem Somos", calc: "Calculadora", visa: "Simulador de Visto", blog: "Blog", cta: "Fale Conosco" },
  es: { about: "Quiénes Somos", calc: "Calculadora", visa: "Simulador de Visado", blog: "Blog", cta: "Contactar" },
  en: { about: "About Us", calc: "Calculator", visa: "Visa Simulator", blog: "Blog", cta: "Contact Us" },
};

const languages: Record<
  Locale,
  { label: string; flag: string; ariaLabel: string }
> = {
  pt: { label: "PT", flag: "🇧🇷", ariaLabel: "Português" },
  es: { label: "ES", flag: "🇪🇸", ariaLabel: "Español" },
  en: { label: "EN", flag: "🇺🇸", ariaLabel: "English" },
};

export default function Header({ lang }: { lang: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = labels[lang];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <img src="/logo.png" alt="Plano Espanha Logo" className="h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${lang}/quem-somos`} className="text-[15px] font-semibold text-gray-700 hover:text-brand-600 transition-colors uppercase tracking-wide">
            {t.about}
          </Link>
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
                aria-label={languages[l].ariaLabel}
                className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded transition-all ${
                  l === lang
                    ? "bg-white text-brand-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span aria-hidden="true">{languages[l].flag}</span>
                <span>{languages[l].label}</span>
              </Link>
            ))}
          </div>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-600 text-white text-[13px] font-bold px-6 py-3 rounded hover:bg-brand-700 transition-all uppercase tracking-widest shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481s3.48 5.223 3.48 8.405c-.003 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.3 1.656zm6.29-4.113l.353.21c1.547.919 3.338 1.403 5.16 1.404h.005c5.454 0 9.893-4.438 9.895-9.895.001-2.645-1.027-5.131-2.895-6.999s-4.355-2.896-6.998-2.897c-5.455 0-9.893 4.439-9.895 9.897-.001 1.922.553 3.791 1.599 5.402l.231.356-.99 3.614 3.707-.972zm11.234-7.147c-.287-.144-1.696-.838-1.958-.933s-.454-.144-.645.144-.74.933-.906 1.123-.334.215-.621.071c-.287-.144-1.213-.447-2.31-1.428-.854-.762-1.43-1.703-1.598-1.99-.167-.287-.018-.442.126-.585.13-.129.287-.335.43-.502.143-.167.191-.287.287-.478s.048-.359-.024-.502-.645-1.554-.885-2.129c-.233-.561-.471-.484-.645-.493l-.55-.007c-.191 0-.501.072-.764.359s-1.003.98-1.003 2.391 1.027 2.822 1.17 3.013c.143.191 2.021 3.086 4.897 4.329.684.296 1.218.473 1.635.606.687.218 1.312.187 1.807.113.552-.083 1.696-.693 1.935-1.363s.239-1.244.167-1.363-.263-.215-.55-.359z"/>
            </svg>
            {t.cta}
          </a>
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
          <Link href={`/${lang}/quem-somos`} className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>{t.about}</Link>
          <Link href={`/${lang}/calculadora`} className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>{t.calc}</Link>
          <Link href={`/${lang}/simulador`} className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>{t.visa}</Link>
          <Link href={`/${lang}/blog`} className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>{t.blog}</Link>
          <div className="flex gap-2 pt-2">
            {(["pt", "es", "en"] as Locale[]).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                aria-label={languages[l].ariaLabel}
                className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded ${
                  l === lang
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span aria-hidden="true">{languages[l].flag}</span>
                <span>{languages[l].label}</span>
              </Link>
            ))}
          </div>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-brand-600 text-white text-center font-semibold px-5 py-3 rounded-lg flex items-center justify-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481s3.48 5.223 3.48 8.405c-.003 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.3 1.656zm6.29-4.113l.353.21c1.547.919 3.338 1.403 5.16 1.404h.005c5.454 0 9.893-4.438 9.895-9.895.001-2.645-1.027-5.131-2.895-6.999s-4.355-2.896-6.998-2.897c-5.455 0-9.893 4.439-9.895 9.897-.001 1.922.553 3.791 1.599 5.402l.231.356-.99 3.614 3.707-.972zm11.234-7.147c-.287-.144-1.696-.838-1.958-.933s-.454-.144-.645.144-.74.933-.906 1.123-.334.215-.621.071c-.287-.144-1.213-.447-2.31-1.428-.854-.762-1.43-1.703-1.598-1.99-.167-.287-.018-.442.126-.585.13-.129.287-.335.43-.502.143-.167.191-.287.287-.478s.048-.359-.024-.502-.645-1.554-.885-2.129c-.233-.561-.471-.484-.645-.493l-.55-.007c-.191 0-.501.072-.764.359s-1.003.98-1.003 2.391 1.027 2.822 1.17 3.013c.143.191 2.021 3.086 4.897 4.329.684.296 1.218.473 1.635.606.687.218 1.312.187 1.807.113.552-.083 1.696-.693 1.935-1.363s.239-1.244.167-1.363-.263-.215-.55-.359z"/>
            </svg>
            {t.cta}
          </a>
        </nav>
      )}
    </header>
  );
}
