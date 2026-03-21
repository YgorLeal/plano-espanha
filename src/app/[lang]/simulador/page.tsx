import Link from "next/link";
import type { Metadata } from "next";
import VisaSimulator from "@/components/VisaSimulator";
import { Locale } from "@/lib/i18n";
import { buildPageMetadata, siteName, absoluteUrl, toJsonLd } from "@/lib/seo";

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Simulador de visto para a Espanha",
    description:
      "Triagem orientativa para descobrir quais vistos e rotas migratórias combinam com o seu perfil para morar legalmente na Espanha.",
  },
  es: {
    title: "Simulador de visado para España",
    description:
      "Triagem orientativa para descubrir qué visados y rutas migratorias encajan con tu perfil para vivir legalmente en España.",
  },
  en: {
    title: "Spain visa simulator",
    description:
      "Guided triage to find out which visa and migration routes match your profile for living legally in Spain.",
  },
};

const pageCopy: Record<Locale, {
  eyebrow: string;
  lead: string;
  trustTitle: string;
  trustBody: string;
  card1Title: string;
  card1Body: string;
  card2Title: string;
  card2Body: string;
  card3Title: string;
  card3Body: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
}> = {
  pt: {
    eyebrow: "Triagem migratória",
    lead:
      "Este simulador foi desenhado para fazer uma triagem séria, baseada em fontes oficiais do governo espanhol. Ele não substitui análise jurídica, mas evita recomendações soltas e pouco confiáveis.",
    trustTitle: "O que ele faz",
    trustBody:
      "Ele cruza localização, objetivo, renda, oferta de trabalho, vínculo familiar, estudos e tempo de permanência na Espanha para sugerir as 3 rotas com maior aderência.",
    card1Title: "Base oficial",
    card1Body:
      "As regras do motor usam páginas e instruções do Ministerio de Inclusión, UGE, BOE e portais oficiais. A via de investidor não entra como recomendação automática.",
    card2Title: "Sem chute",
    card2Body:
      "Quando o caso é limítrofe, o simulador deixa claro o que confirmar e por que a via apareceu, em vez de vender certeza onde não existe.",
    card3Title: "Escopo completo",
    card3Body:
      "O fluxo cobre perfis fora da Espanha e também quem já está no país e precisa regularizar a situação ou avaliar arraigo.",
    ctaTitle: "Quer validar a parte financeira primeiro?",
    ctaBody:
      "A calculadora de custo de vida complementa o simulador: ela mostra quanto custa viver na Espanha por cidade e perfil.",
    ctaButton: "Abrir calculadora",
  },
  es: {
    eyebrow: "Triage migratoria",
    lead:
      "Este simulador está pensado para hacer una triage seria, basada en fuentes oficiales del gobierno español. No sustituye el análisis jurídico, pero evita recomendaciones vagas y poco confiables.",
    trustTitle: "Qué hace",
    trustBody:
      "Cruza ubicación, objetivo, ingresos, oferta laboral, vínculo familiar, estudios y tiempo de permanencia en España para sugerir las 3 vías con mayor ajuste.",
    card1Title: "Base oficial",
    card1Body:
      "El motor usa páginas e instrucciones del Ministerio de Inclusión, UGE, BOE y portales oficiales. La vía de inversor no entra como recomendación automática.",
    card2Title: "Sin adivinar",
    card2Body:
      "Cuando el caso es límite, el simulador explica qué confirmar y por qué apareció la vía, en vez de fingir certeza donde no existe.",
    card3Title: "Cobertura completa",
    card3Body:
      "El flujo cubre perfiles fuera de España y también a quien ya está en el país y necesita regularizar o evaluar arraigo.",
    ctaTitle: "¿Quieres validar primero la parte financiera?",
    ctaBody:
      "La calculadora de coste de vida complementa el simulador: muestra cuánto cuesta vivir en España por ciudad y perfil.",
    ctaButton: "Abrir calculadora",
  },
  en: {
    eyebrow: "Migration triage",
    lead:
      "This simulator is built for serious triage based on official Spanish government sources. It does not replace legal advice, but it avoids vague and unreliable recommendations.",
    trustTitle: "What it does",
    trustBody:
      "It combines location, goal, income, job offer, family ties, studies, and time in Spain to suggest the 3 best-fitting routes.",
    card1Title: "Official basis",
    card1Body:
      "The engine uses pages and instructions from the Ministry of Inclusion, UGE, BOE, and official portals. The investor route is not included as an automatic recommendation.",
    card2Title: "No guessing",
    card2Body:
      "When the case is borderline, the simulator says what to verify and why a route appears instead of pretending certainty where there is none.",
    card3Title: "Full scope",
    card3Body:
      "The flow covers people outside Spain and also those already in the country who need regularization or an arraigo path.",
    ctaTitle: "Want to validate the financial side first?",
    ctaBody:
      "The cost of living calculator complements the simulator: it shows how much it costs to live in Spain by city and profile.",
    ctaButton: "Open calculator",
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

function buildSchema(lang: Locale) {
  const current = metadataByLocale[lang];
  const pathByLocale = {
    pt: "/pt/simulador/",
    es: "/es/simulador/",
    en: "/en/simulador/",
  } as const;

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
          name: current.title,
          item: absoluteUrl(pathByLocale[lang]),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: current.title,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: current.description,
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
  const t = pageCopy[params.lang];

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

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <nav className="mb-10 text-xs font-black uppercase tracking-[0.24em] text-gray-500">
          <Link href={`/${params.lang}/`} className="hover:text-brand-600">
            {siteName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{t.eyebrow}</span>
        </nav>

        <div className="max-w-4xl mb-10">
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-700">
            {t.eyebrow}
          </div>
          <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-gray-900 font-heading">
            {metadataByLocale[params.lang].title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl md:text-2xl leading-relaxed text-gray-700">
            {t.lead}
          </p>
        </div>

        <div className="mb-14 grid gap-4 md:grid-cols-3">
          {[t.card1Title, t.card2Title, t.card3Title].map((title, index) => {
            const body = [t.card1Body, t.card2Body, t.card3Body][index];
            return (
              <div
                key={title}
                className="rounded-[1.75rem] border border-white/60 bg-white/90 p-6 shadow-xl shadow-gray-200/60 backdrop-blur-sm"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-600">
                  0{index + 1}
                </div>
                <h2 className="mt-2 text-xl font-black uppercase tracking-tight text-gray-900">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{body}</p>
              </div>
            );
          })}
        </div>

        <VisaSimulator lang={params.lang} />

        <section className="mt-16 rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white shadow-2xl shadow-gray-900/30">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-300">
                {t.trustTitle}
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black uppercase tracking-tighter">{t.trustTitle}</h2>
              <p className="mt-4 max-w-3xl text-gray-300 leading-relaxed">{t.trustBody}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-gray-200">
              <div className="font-black uppercase tracking-[0.24em] text-[10px] text-brand-300">
                {params.lang === "pt" ? "Importante" : params.lang === "es" ? "Importante" : "Important"}
              </div>
              <p className="mt-3 leading-relaxed">
                {params.lang === "pt"
                  ? "Se a pessoa já estiver em situação irregular, a resposta precisa ser mais conservadora. O simulador prioriza rotas que o governo espanhol reconhece formalmente."
                  : params.lang === "es"
                  ? "Si la persona ya está en situación irregular, la respuesta debe ser más conservadora. El simulador prioriza vías reconocidas formalmente por el gobierno español."
                  : "If the person is already irregular, the answer needs to be more conservative. The simulator prioritizes routes formally recognized by the Spanish government."}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
              {t.ctaTitle}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">{t.ctaBody}</p>
            <Link
              href={`/${params.lang}/calculadora/`}
              className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-700"
            >
              {t.ctaButton}
            </Link>
          </div>
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
              {params.lang === "pt" ? "O que o simulador não faz" : params.lang === "es" ? "Lo que no hace el simulador" : "What the simulator does not do"}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
              <li>
                {params.lang === "pt"
                  ? "Não substitui análise jurídica individual."
                  : params.lang === "es"
                  ? "No sustituye el análisis jurídico individual."
                  : "It does not replace individual legal analysis."}
              </li>
              <li>
                {params.lang === "pt"
                  ? "Não recomenda a via de investidor como padrão."
                  : params.lang === "es"
                  ? "No recomienda la vía de inversor como opción estándar."
                  : "It does not recommend the investor route as a default option."}
              </li>
              <li>
                {params.lang === "pt"
                  ? "Não promete aprovação automática."
                  : params.lang === "es"
                  ? "No promete aprobación automática."
                  : "It does not promise automatic approval."}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
