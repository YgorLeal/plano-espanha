import Link from "next/link";
import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { Locale } from "@/lib/i18n";
import { buildPageMetadata, absoluteUrl, siteName, toJsonLd } from "@/lib/seo";
import { getCosts } from "@/lib/costData";

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Calculadora de custo de vida na Espanha",
    description:
      "Veja quanto custa morar em Madrid, Barcelona, Valencia e outras cidades e estime seu orçamento mensal para viver na Espanha.",
  },
  es: {
    title: "Calculadora de coste de vida en España",
    description:
      "Comprueba cuánto cuesta vivir en Madrid, Barcelona, Valencia y otras ciudades y estima tu presupuesto mensual para España.",
  },
  en: {
    title: "Spain cost of living calculator",
    description:
      "Check how much it costs to live in Madrid, Barcelona, Valencia and other cities and estimate your monthly Spain budget.",
  },
};

const pageCopy: Record<
  Locale,
  {
    eyebrow: string;
    intro: string;
    intro2: string;
    benefitsTitle: string;
    benefits: string[];
    methodTitle: string;
    method: string[];
    faqTitle: string;
    faq: { q: string; a: string }[];
    relatedTitle: string;
    relatedBody: string;
    relatedLinks: { href: string; label: string }[];
  }
> = {
  pt: {
    eyebrow: "Custo de vida",
    intro:
      "A calculadora foi desenhada para responder a uma busca com intenção alta: quanto custa viver na Espanha de forma realista, por cidade e por perfil familiar.",
    intro2:
      "Ela funciona melhor como landing page e como ferramenta, então a página traz contexto, método e comparativos para aumentar confiança e tempo de permanência.",
    benefitsTitle: "Por que usar esta calculadora",
    benefits: [
      "Mostra estimativa mensal por cidade e perfil.",
      "Ajuda a comparar Madrid, Barcelona, Valencia e outras cidades.",
      "Serve de ponto de partida para orçamento e mudança.",
    ],
    methodTitle: "Como calculamos",
    method: [
      "Usamos dados agregados e arredondados por cidade e perfil.",
      "Os números são atualizados com base em referências públicas e revisão editorial.",
      "O resultado é uma estimativa prática, não uma cotação imobiliária em tempo real.",
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "A calculadora substitui orçamento profissional?",
        a: "Não. Ela serve para triagem e planejamento inicial, com foco em comparação e faixas realistas.",
      },
      {
        q: "Por que Madrid e Barcelona parecem mais caras?",
        a: "Porque concentram mais demanda, aluguel mais caro e um custo geral superior ao de cidades como Valencia ou Sevilha.",
      },
      {
        q: "A calculadora ajuda no visto?",
        a: "Sim. Ela complementa o simulador de visto mostrando se o seu plano financeiro faz sentido para a rota escolhida.",
      },
      {
        q: "Os valores são oficiais?",
        a: "São estimativas editoriais e de mercado, usadas como referência prática. Para decisões jurídicas ou financeiras, confirme os dados atualizados.",
      },
    ],
    relatedTitle: "Próximos passos",
    relatedBody:
      "Depois de estimar o custo de vida, o próximo passo lógico é validar qual rota migratória combina com seu perfil e então cruzar os dois resultados.",
    relatedLinks: [
      { href: "/pt/simulador/", label: "Abrir simulador de visto" },
      { href: "/pt/blog/qual-visto-espanha-brasileiro/", label: "Ler guia de vistos" },
      { href: "/pt/blog/custo-de-vida-espanha-2026/", label: "Ver guia de cidades" },
    ],
  },
  es: {
    eyebrow: "Coste de vida",
    intro:
      "La calculadora está pensada para una búsqueda de alta intención: cuánto cuesta vivir en España de forma realista, por ciudad y por perfil familiar.",
    intro2:
      "Funciona mejor como landing page y como herramienta, así que la página aporta contexto, método y comparativas para reforzar confianza y tiempo de permanencia.",
    benefitsTitle: "Por qué usar esta calculadora",
    benefits: [
      "Muestra estimaciones mensuales por ciudad y perfil.",
      "Ayuda a comparar Madrid, Barcelona, Valencia y otras ciudades.",
      "Sirve como punto de partida para presupuesto y mudanza.",
    ],
    methodTitle: "Cómo calculamos",
    method: [
      "Usamos datos agregados y redondeados por ciudad y perfil.",
      "Las cifras se actualizan con referencias públicas y revisión editorial.",
      "El resultado es una estimación práctica, no una cotización inmobiliaria en tiempo real.",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿La calculadora sustituye un presupuesto profesional?",
        a: "No. Sirve para triage y planificación inicial, con foco en comparación y rangos realistas.",
      },
      {
        q: "¿Por qué Madrid y Barcelona parecen más caras?",
        a: "Porque concentran más demanda, alquiler más caro y un coste general superior al de Valencia o Sevilla.",
      },
      {
        q: "¿La calculadora ayuda con el visado?",
        a: "Sí. Complementa el simulador de visado mostrando si tu plan financiero encaja con la vía elegida.",
      },
      {
        q: "¿Los valores son oficiales?",
        a: "Son estimaciones editoriales y de mercado, útiles como referencia práctica. Para decisiones jurídicas o financieras, confirma los datos actualizados.",
      },
    ],
    relatedTitle: "Siguientes pasos",
    relatedBody:
      "Después de estimar el coste de vida, el siguiente paso lógico es validar qué ruta migratoria encaja con tu perfil y cruzar ambos resultados.",
    relatedLinks: [
      { href: "/es/simulador/", label: "Abrir simulador de visado" },
      { href: "/es/blog/qual-visto-espanha-brasileiro/", label: "Leer guía de visados" },
      { href: "/es/blog/custo-de-vida-espanha-2026/", label: "Ver guía de ciudades" },
    ],
  },
  en: {
    eyebrow: "Cost of living",
    intro:
      "The calculator is built for a high-intent search: how much it costs to live in Spain in a realistic way, by city and household profile.",
    intro2:
      "It works best both as a landing page and as a tool, so the page adds context, method, and comparisons to improve trust and dwell time.",
    benefitsTitle: "Why use this calculator",
    benefits: [
      "Shows monthly estimates by city and profile.",
      "Helps compare Madrid, Barcelona, Valencia, and other cities.",
      "Acts as a starting point for budgeting and moving.",
    ],
    methodTitle: "How we calculate",
    method: [
      "We use aggregated, rounded data by city and profile.",
      "Numbers are updated with public references and editorial review.",
      "The result is a practical estimate, not a live property quote.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Does the calculator replace a professional budget?",
        a: "No. It is for triage and initial planning, focused on comparison and realistic ranges.",
      },
      {
        q: "Why do Madrid and Barcelona look more expensive?",
        a: "They have more demand, higher rent, and a generally higher cost than cities like Valencia or Seville.",
      },
      {
        q: "Does the calculator help with the visa?",
        a: "Yes. It complements the visa simulator by showing whether your financial plan matches the chosen route.",
      },
      {
        q: "Are the numbers official?",
        a: "They are editorial and market-based estimates, useful as practical references. For legal or financial decisions, confirm up-to-date figures.",
      },
    ],
    relatedTitle: "Next steps",
    relatedBody:
      "After estimating the cost of living, the next logical step is to validate which migration route fits your profile and compare both results.",
    relatedLinks: [
      { href: "/en/simulador/", label: "Open visa simulator" },
      { href: "/en/blog/qual-visto-espanha-brasileiro/", label: "Read visa guide" },
      { href: "/en/blog/custo-de-vida-espanha-2026/", label: "View city guide" },
    ],
  },
};

const highlightCities = ["madrid", "barcelona", "valencia"] as const;

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

function buildSchema(lang: Locale) {
  const pathByLocale = {
    pt: "/pt/calculadora/",
    es: "/es/calculadora/",
    en: "/en/calculadora/",
  } as const;

  const meta = metadataByLocale[lang];

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
          name: meta.title,
          item: absoluteUrl(pathByLocale[lang]),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: meta.title,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: meta.description,
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
  return highlightCities.map((city) => {
    const solo = getCosts(city, "solo");
    const couple = getCosts(city, "couple");
    const family = getCosts(city, "family");
    const labels = {
      pt: { madrid: "Madrid", barcelona: "Barcelona", valencia: "Valencia" },
      es: { madrid: "Madrid", barcelona: "Barcelona", valencia: "Valencia" },
      en: { madrid: "Madrid", barcelona: "Barcelona", valencia: "Valencia" },
    } as const;

    return {
      city,
      label: labels[lang][city],
      solo: solo.total,
      couple: couple.total,
      family: family.total,
    };
  });
}

export default function CalculadoraPage({ params }: { params: { lang: Locale } }) {
  const t = pageCopy[params.lang];
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

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <nav className="mb-10 text-xs font-black uppercase tracking-[0.24em] text-gray-500">
          <Link href={`/${params.lang}/`} className="hover:text-brand-600">
            {siteName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{metadataByLocale[params.lang].title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-700">
              {t.eyebrow}
            </div>
            <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-gray-900 font-heading">
              {metadataByLocale[params.lang].title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl md:text-2xl leading-relaxed text-gray-700">
              {t.intro}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{t.intro2}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${params.lang}/simulador/`}
                className="inline-flex rounded-full bg-brand-600 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-700"
              >
                {params.lang === "pt" ? "Abrir simulador" : params.lang === "es" ? "Abrir simulador" : "Open simulator"}
              </Link>
              <Link
                href={`/${params.lang}/blog/custo-de-vida-espanha-2026/`}
                className="inline-flex rounded-full border border-gray-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-gray-700 transition hover:border-brand-600 hover:text-brand-600"
              >
                {params.lang === "pt" ? "Ver guia de custos" : params.lang === "es" ? "Ver guía de costes" : "View cost guide"}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {t.benefits.map((benefit) => (
                <div key={benefit} className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-xl shadow-gray-200/60 backdrop-blur-sm">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-600">SEO</div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-gray-950 p-8 text-white shadow-2xl shadow-gray-900/30">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-300">
              {t.benefitsTitle}
            </div>
            <div className="mt-5 space-y-4">
              {cities.map((city) => (
                <div key={city.city} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black uppercase tracking-tight">{city.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-300">Solo</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-2xl bg-white/8 p-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">Solo</div>
                      <div className="mt-1 text-lg font-black">€{city.solo}</div>
                    </div>
                    <div className="rounded-2xl bg-white/8 p-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">Couple</div>
                      <div className="mt-1 text-lg font-black">€{city.couple}</div>
                    </div>
                    <div className="rounded-2xl bg-white/8 p-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">Family</div>
                      <div className="mt-1 text-lg font-black">€{city.family}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{t.methodTitle}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
                {t.method.map((item) => (
                  <li key={item} className="rounded-2xl bg-gray-50 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{t.faqTitle}</h2>
              <div className="mt-4 space-y-3">
                {t.faq.map((item) => (
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
                {t.relatedTitle}
              </div>
              <p className="mt-3 text-gray-300 leading-relaxed">{t.relatedBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {t.relatedLinks.map((link) => (
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
          <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
            {params.lang === "pt" ? "Ferramenta" : params.lang === "es" ? "Herramienta" : "Tool"}
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            {params.lang === "pt"
              ? "Depois do contexto editorial, a ferramenta permite refinar o cálculo por cidade e perfil em poucos cliques."
              : params.lang === "es"
              ? "Después del contexto editorial, la herramienta permite afinar el cálculo por ciudad y perfil en pocos clics."
              : "After the editorial context, the tool lets users refine the estimate by city and profile in a few clicks."}
          </p>
          <div className="mt-8">
            <Calculator lang={params.lang} />
          </div>
        </section>
      </div>
    </section>
  );
}
