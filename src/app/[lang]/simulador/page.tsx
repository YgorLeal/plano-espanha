import Link from "next/link";
import type { Metadata } from "next";
import VisaSimulator from "@/components/VisaSimulator";
import { Locale } from "@/lib/i18n";
import { buildPageMetadata, siteName, absoluteUrl, toJsonLd } from "@/lib/seo";
import { getVisaSimulatorPageContent } from "@/lib/siteCopy";

const pathByLocale = {
  pt: "/pt/simulador/",
  es: "/es/simulador/",
  en: "/en/simulador/",
} as const;

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const content = getVisaSimulatorPageContent(params.lang);

  return buildPageMetadata({
    locale: params.lang,
    title: content.metadata.title,
    description: content.metadata.description,
    pathByLocale,
  });
}

function buildSchema(lang: Locale) {
  const content = getVisaSimulatorPageContent(lang);

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
      applicationCategory: "BusinessApplication",
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

export default function SimuladorPage({ params }: { params: { lang: Locale } }) {
  const content = getVisaSimulatorPageContent(params.lang);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfbfb_0%,#ffffff_45%,#f8fafc_100%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(buildSchema(params.lang)) }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-600 blur-3xl" />
        <div className="absolute top-1/3 left-0 h-80 w-80 rounded-full bg-accent-yellow blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <nav className="mb-10 text-xs font-black uppercase tracking-[0.24em] text-gray-500">
          <Link href={`/${params.lang}/`} className="hover:text-brand-600">
            {siteName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{content.eyebrow}</span>
        </nav>

        <div className="mb-10 max-w-4xl">
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-700">
            {content.eyebrow}
          </div>
          <h1 className="mt-4 font-heading text-5xl font-black uppercase leading-[0.95] tracking-tighter text-gray-900 md:text-7xl">
            {content.metadata.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl">
            {content.lead}
          </p>
        </div>

        <div className="mb-14 grid gap-4 md:grid-cols-3">
          {content.cards.map((card, index) => (
            <div
              key={card.title}
              className="rounded-[1.75rem] border border-white/60 bg-white/90 p-6 shadow-xl shadow-gray-200/60 backdrop-blur-sm"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-600">0{index + 1}</div>
              <h2 className="mt-2 text-xl font-black uppercase tracking-tight text-gray-900">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.body}</p>
            </div>
          ))}
        </div>

        <VisaSimulator lang={params.lang} />

        <section className="mt-16 rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white shadow-2xl shadow-gray-900/30">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-300">
                {content.trustTitle}
              </div>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tighter md:text-4xl">
                {content.trustTitle}
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-gray-300">{content.trustBody}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-gray-200">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-300">
                {content.important}
              </div>
              <p className="mt-3 leading-relaxed">{content.importantBody}</p>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
              {content.ctaTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">{content.ctaBody}</p>
            <Link
              href={`/${params.lang}/calculadora/`}
              className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-700"
            >
              {content.ctaButton}
            </Link>
          </div>
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{content.noTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
              {content.noItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-600">
              {content.noLegalAdvice}
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
