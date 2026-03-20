import Link from "next/link";
import { Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const content: Record<Locale, { title: string; subtitle: string; soon: string; cta: string }> = {
  pt: {
    title: "Simulador de Visto",
    subtitle: "Descubra qual tipo de visto se encaixa no seu perfil",
    soon: "O simulador de visto está sendo finalizado e estará disponível em breve. Enquanto isso, confira nosso guia completo sobre vistos.",
    cta: "Ler guia de vistos",
  },
  es: {
    title: "Simulador de Visado",
    subtitle: "Descubre qué tipo de visado se adapta a tu perfil",
    soon: "El simulador de visado se está finalizando y estará disponible pronto. Mientras tanto, consulta nuestra guía completa sobre visados.",
    cta: "Leer guía de visados",
  },
  en: {
    title: "Visa Simulator",
    subtitle: "Find out which visa type fits your profile",
    soon: "The visa simulator is being finalized and will be available soon. Meanwhile, check out our complete visa guide.",
    cta: "Read visa guide",
  },
};

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Simulador de visto para a Espanha",
    description:
      "Descubra quais tipos de visto combinam com o seu perfil para morar legalmente na Espanha.",
  },
  es: {
    title: "Simulador de visado para Espana",
    description:
      "Descubre qué tipos de visado encajan con tu perfil para vivir legalmente en Espana.",
  },
  en: {
    title: "Spain visa simulator",
    description:
      "Find out which visa paths fit your profile for moving legally to Spain.",
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
      pt: "/pt/simulador/",
      es: "/es/simulador/",
      en: "/en/simulador/",
    },
  });
}

export default function SimuladorPage({ params }: { params: { lang: Locale } }) {
  const t = content[params.lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="bg-white rounded-lg border-b-8 border-brand-600 p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-accent-yellow" />
        <div className="text-7xl mb-10">🛂</div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter font-heading">{t.title}</h1>
        <div className="w-20 h-2 bg-brand-600 mx-auto mb-10" />
        <p className="text-xl text-gray-600 mb-10 font-medium">{t.subtitle}</p>
        
        <div className="bg-gray-900 text-white p-10 rounded shadow-xl mb-12 max-w-2xl mx-auto">
          <div className="inline-block bg-brand-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
             {params.lang === "pt" ? "Em desenvolvimento" : params.lang === "es" ? "En desarrollo" : "Under development"}
          </div>
          <p className="text-gray-400 font-medium leading-relaxed mb-10">{t.soon}</p>
          <Link
            href={`/${params.lang}/blog/qual-visto-espanha-brasileiro`}
            className="inline-block bg-white text-gray-900 font-black px-10 py-5 rounded hover:bg-brand-600 hover:text-white transition-all uppercase tracking-widest text-sm active:scale-95 shadow-lg"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
