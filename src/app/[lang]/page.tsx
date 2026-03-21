import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blogEdge";
import { buildPageMetadata } from "@/lib/seo";

const homeMetadata: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Planeje sua mudança para a Espanha",
    description:
      "Calculadora de custo de vida, simulador de visto e guias práticos para brasileiros que querem morar na Espanha.",
  },
  es: {
    title: "Planifica tu mudanza a Espana",
    description:
      "Calculadora de coste de vida, simulador de visado y guias practicas para brasileños que quieren vivir en Espana.",
  },
  en: {
    title: "Plan your move to Spain",
    description:
      "Cost of living calculator, visa simulator and practical guides for Brazilians planning to live in Spain.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const meta = homeMetadata[params.lang];

  return buildPageMetadata({
    locale: params.lang,
    title: meta.title,
    description: meta.description,
    pathByLocale: {
      pt: "/pt/",
      es: "/es/",
      en: "/en/",
    },
  });
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const t = await getDictionary(params.lang);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-50 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
          <div className="max-w-4xl">
            <span className="inline-block bg-brand-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-8">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8 uppercase tracking-tighter">
              {t.hero.title.split("Espanha")[0]}
              <span className="text-brand-600">Espanha</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl font-medium">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href={`/${params.lang}/calculadora`}
                className="bg-brand-600 text-white font-bold px-10 py-5 rounded shadow-xl hover:bg-brand-700 transition-all uppercase tracking-widest text-sm text-center active:scale-95"
              >
                {t.hero.cta}
              </Link>
              <Link
                href={`/${params.lang}/simulador`}
                className="bg-white border-2 border-gray-200 text-gray-900 font-bold px-10 py-5 rounded hover:border-brand-600 hover:text-brand-600 transition-all uppercase tracking-widest text-sm text-center active:scale-95"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle Spanish Flag Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none select-none overflow-hidden hidden lg:block">
           <div className="h-1/4 bg-brand-600" />
           <div className="h-2/4 bg-accent-yellow" />
           <div className="h-1/4 bg-brand-600" />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
              {t.features.title}
            </h2>
            <div className="w-20 h-2 bg-brand-600" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "📊",
              ...t.features.calculator,
              href: `/${params.lang}/calculadora`,
            },
            {
              icon: "🛂",
              ...t.features.visa,
              href: `/${params.lang}/simulador`,
            },
            {
              icon: "📝",
              ...t.features.blog,
              href: `/${params.lang}/blog`,
            },
          ].map((feature, i) => (
            <Link
              key={i}
              href={feature.href}
              className="group bg-white border-b-4 border-gray-100 p-10 hover:border-brand-600 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 w-fit">{feature.icon}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-brand-600 transition-colors uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-8 flex-grow">
                {feature.description}
              </p>
              <div className="text-brand-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                Saiba mais 
                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest posts */}
      {posts.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t.blog.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${params.lang}/blog/${post.slug}`}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <span className="text-xs font-medium text-brand-600 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {post.description}
                  </p>
                  <span className="text-xs text-gray-400 mt-4 block">
                    {new Date(post.date).toLocaleDateString(params.lang)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {params.lang === "pt"
            ? "Pronto para planejar sua mudança?"
            : params.lang === "es"
            ? "¿Listo para planificar tu mudanza?"
            : "Ready to plan your move?"}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {params.lang === "pt"
            ? "Comece pela calculadora — é grátis e leva menos de 2 minutos."
            : params.lang === "es"
            ? "Empieza por la calculadora — es gratis y tarda menos de 2 minutos."
            : "Start with the calculator — it's free and takes less than 2 minutes."}
        </p>
        <Link
          href={`/${params.lang}/calculadora`}
          className="inline-block bg-brand-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-brand-700 transition shadow-lg shadow-brand-200 text-lg"
        >
          {t.hero.cta}
        </Link>
      </section>
    </>
  );
}
