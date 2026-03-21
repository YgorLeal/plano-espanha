import Link from "next/link";
import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { Locale } from "@/lib/i18n";
import { buildPageMetadata, absoluteUrl, siteName, toJsonLd } from "@/lib/seo";
import { getCosts } from "@/lib/costData";
import { getCalculatorPageContent } from "@/lib/siteCopy";

const pathByLocale = {
  pt: "/pt/calculadora/",
  es: "/es/calculadora/",
  en: "/en/calculadora/",
} as const;

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const content = getCalculatorPageContent(params.lang);

  return buildPageMetadata({
    locale: params.lang,
    title: content.metadata.title,
    description: content.metadata.description,
    pathByLocale,
  });
}

function buildSchema(lang: Locale) {
  const content = getCalculatorPageContent(lang);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteName,
          item: absoluteUrl(`/${lang}/`),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: content.metadata.title,
          item: absoluteUrl(pathByLocale[lang]),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: content.metadata.title,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: content.metadata.description,
      url: absoluteUrl(pathByLocale[lang]),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
  ];
}

function cityCards(lang: Locale) {
  const content = getCalculatorPageContent(lang);
  const cities = ["madrid", "barcelona", "valencia"] as const;

  return cities.map((city) => {
    const solo = getCosts(city, "solo");
    const couple = getCosts(city, "couple");
    const family = getCosts(city, "family");

    return {
      city,
      label: content.costCards.find((item) => item.city === city)?.label ?? city,
      solo: solo.total,
      couple: couple.total,
      family: family.total,
    };
  });
}

export default function CalculadoraPage({ params }: { params: { lang: Locale } }) {
  const content = getCalculatorPageContent(params.lang);
  const cities = cityCards(params.lang);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#fff8f2_100%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(buildSchema(params.lang)) }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-600 blur-3xl" />
        <div className="absolute top-1/3 left-0 h-72 w-72 rounded-full bg-accent-yellow blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <nav className="mb-10 text-xs font-black uppercase tracking-[0.24em] text-gray-500">
          <Link href={`/${params.lang}/`} className="hover:text-brand-600">
            {siteName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{content.metadata.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-700">
              {content.eyebrow}
            </div>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase leading-[0.95] tracking-tighter text-gray-900 md:text-7xl">
              {content.metadata.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl">
              {content.intro}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{content.intro2}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${params.lang}/simulador/`}
                className="inline-flex rounded-full bg-brand-600 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-700"
              >
                {content.actions.simulator}
              </Link>
              <Link
                href={`/${params.lang}/blog/custo-de-vida-espanha-2026/`}
                className="inline-flex rounded-full border border-gray-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-gray-700 transition hover:border-brand-600 hover:text-brand-600"
              >
                {content.actions.guide}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {content.benefits.map((benefit) => (
                <div key={benefit} className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-xl shadow-gray-200/60 backdrop-blur-sm">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-600">{content.benefitBadge}</div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white shadow-2xl shadow-gray-900/30">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-300">
              {content.benefitsTitle}
            </div>
            <div className="mt-5 space-y-4">
              {cities.map((city) => (
                <div key={city.city} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black uppercase tracking-tight">{city.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-300">
                      {content.comparisonLabels.badge}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center relative group">
                    <div className="rounded-2xl bg-white/8 p-3 blur-[2px] opacity-40 transition-all group-hover:blur-none group-hover:opacity-100">
                      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">
                        {content.comparisonLabels.solo}
                      </div>
                      <div className="mt-1 text-lg font-black">€{city.solo}</div>
                    </div>
                    <div className="rounded-2xl bg-white/8 p-3 blur-[3px] opacity-40 transition-all group-hover:blur-none group-hover:opacity-100">
                      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">
                        {content.comparisonLabels.couple}
                      </div>
                      <div className="mt-1 text-lg font-black">€{city.couple}</div>
                    </div>
                    <div className="rounded-2xl bg-white/8 p-3 blur-[4px] opacity-40 transition-all group-hover:blur-none group-hover:opacity-100">
                      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">
                        {content.comparisonLabels.family}
                      </div>
                      <div className="mt-1 text-lg font-black">€{city.family}</div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity group-hover:opacity-0 pointer-events-none">
                       <div className="rounded-full bg-brand-600/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                          {content.comparisonLabels.reveal}
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link 
                href="#ferramenta"
                className="flex w-full items-center justify-center rounded-2xl bg-brand-600 py-4 text-xs font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-700 shadow-lg shadow-brand-500/20"
              >
                {content.comparisonLabels.reveal}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl" id="ferramenta">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{content.methodTitle}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
                {content.method.map((item) => (
                  <li key={item} className="rounded-2xl bg-gray-50 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{content.faqTitle}</h2>
              <div className="mt-4 space-y-3">
                {content.faq.map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <summary className="cursor-pointer list-none text-sm font-black uppercase tracking-tight text-gray-900">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14 rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white shadow-2xl shadow-gray-900/30">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-300">
                {content.relatedTitle}
              </div>
              <p className="mt-3 leading-relaxed text-gray-300">{content.relatedBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {content.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-brand-300 hover:text-brand-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{content.toolTitle}</h2>
          <p className="mt-3 leading-relaxed text-gray-600">{content.toolBody}</p>
          <div className="mt-8">
            <Calculator lang={params.lang} />
          </div>
        </section>
      </div>
    </section>
  );
}
