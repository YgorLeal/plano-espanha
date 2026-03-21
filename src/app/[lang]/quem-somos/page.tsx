import Link from "next/link";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { buildPageMetadata, siteName, absoluteUrl } from "@/lib/seo";
import { getAboutPageContent } from "@/lib/siteCopy";

const pathByLocale = {
  pt: "/pt/quem-somos/",
  es: "/es/quem-somos/",
  en: "/en/quem-somos/",
} as const;

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const content = getAboutPageContent(params.lang);

  return buildPageMetadata({
    locale: params.lang,
    title: content.metadata.title,
    description: content.metadata.description,
    pathByLocale,
  });
}

export default function QuemSomosPage({ params }: { params: { lang: Locale } }) {
  const content = getAboutPageContent(params.lang);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfbfb_0%,#ffffff_45%,#f8fafc_100%)]">
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

        <div className="mb-16 max-w-4xl">
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-700">
            {content.eyebrow}
          </div>
          <h1 className="mt-4 font-heading text-5xl font-black uppercase leading-[0.95] tracking-tighter text-gray-900 md:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl">
            {content.lead}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <section className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">{content.historyTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {content.historyBody}
              </p>
            </section>

            <section className="rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white shadow-2xl shadow-gray-900/30">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-300">{content.missionTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                {content.missionBody}
              </p>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">{content.valuesTitle}</h2>
              <div className="mt-6 space-y-6">
                {content.values.map((value) => (
                  <div key={value.title} className="rounded-2xl bg-gray-50 p-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-brand-600">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{value.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">{content.teamTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {content.teamBody}
              </p>
            </section>
          </div>
        </div>

        <section className="mt-16 rounded-[2rem] border border-gray-200 bg-brand-600 p-10 text-white shadow-2xl shadow-brand-200/50">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Pronto para começar?</h2>
            <p className="mt-4 text-xl text-brand-50 opacity-90">
              {params.lang === "pt" 
                ? "Nossos simuladores e calculadoras estão prontos para ajudar você no seu primeiro passo." 
                : params.lang === "es"
                ? "Nuestros simuladores y calculadoras están listos para ayudarte en tu primer paso."
                : "Our simulators and calculators are ready to help you with your first step."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${params.lang}/simulador/`}
                className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-brand-600 transition hover:bg-brand-50"
              >
                Abrir Simulador
              </Link>
              <Link
                href={`/${params.lang}/calculadora/`}
                className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-white/20"
              >
                Abrir Calculadora
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
