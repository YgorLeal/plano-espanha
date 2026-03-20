import Calculator from "@/components/Calculator";
import { Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const titles: Record<Locale, { title: string; subtitle: string }> = {
  pt: { title: "Calculadora de Custo de Vida", subtitle: "Descubra quanto custa viver na Espanha para o seu perfil" },
  es: { title: "Calculadora de Coste de Vida", subtitle: "Descubre cuánto cuesta vivir en España para tu perfil" },
  en: { title: "Cost of Living Calculator", subtitle: "Find out how much it costs to live in Spain for your profile" },
};

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Calculadora de custo de vida na Espanha",
    description:
      "Compare o custo de vida em cidades espanholas e estime seu orçamento mensal para morar na Espanha.",
  },
  es: {
    title: "Calculadora de coste de vida en Espana",
    description:
      "Compara el coste de vida entre ciudades españolas y estima tu presupuesto mensual para vivir en Espana.",
  },
  en: {
    title: "Spain cost of living calculator",
    description:
      "Compare living costs across Spanish cities and estimate your monthly budget to move to Spain.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const meta = metadataByLocale[params.lang];

  return buildPageMetadata({
    locale: params.lang,
    title: meta.title,
    description: meta.description,
    pathByLocale: {
      pt: "/pt/calculadora/",
      es: "/es/calculadora/",
      en: "/en/calculadora/",
    },
  });
}

export default function CalculadoraPage({ params }: { params: { lang: Locale } }) {
  const t = titles[params.lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter font-heading">{t.title}</h1>
        <div className="w-20 h-2 bg-brand-600 mx-auto mb-8" />
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">{t.subtitle}</p>
      </div>
      <Calculator lang={params.lang} />
    </section>
  );
}
