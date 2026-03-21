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
      <section className="relative bg-white overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 uppercase tracking-tighter font-heading">
              {params.lang === "pt" ? (
                <>Assessoria número 1 para sua <span className="text-brand-600">Mudança para a Espanha</span></>
              ) : params.lang === "es" ? (
                <>Planifica tu <span className="text-brand-600">Mudanza a España</span></>
              ) : (
                <>Plan your <span className="text-brand-600">Move to Spain</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-600 mb-10 leading-relaxed font-medium max-w-3xl">
              {params.lang === "pt" 
                ? "Solução especializada e assessoria completa para vistos e nacionalidade espanhola, com a confiança de quem já ajudou centenas de brasileiros."
                : t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-600 text-white font-bold px-10 py-5 rounded-full shadow-2xl hover:bg-brand-700 transition-all uppercase tracking-widest text-sm flex items-center gap-3 active:scale-95 group"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481s3.48 5.223 3.48 8.405c-.003 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.3 1.656zm6.29-4.113l.353.21c1.547.919 3.338 1.403 5.16 1.404h.005c5.454 0 9.893-4.438 9.895-9.895.001-2.645-1.027-5.131-2.895-6.999s-4.355-2.896-6.998-2.897c-5.455 0-9.893 4.439-9.895 9.897-.001 1.922.553 3.791 1.599 5.402l.231.356-.99 3.614 3.707-.972zm11.234-7.147c-.287-.144-1.696-.838-1.958-.933s-.454-.144-.645.144-.74.933-.906 1.123-.334.215-.621.071c-.287-.144-1.213-.447-2.31-1.428-.854-.762-1.43-1.703-1.598-1.99-.167-.287-.018-.442.126-.585.13-.129.287-.335.43-.502.143-.167.191-.287.287-.478s.048-.359-.024-.502-.645-1.554-.885-2.129c-.233-.561-.471-.484-.645-.493l-.55-.007c-.191 0-.501.072-.764.359s-1.003.98-1.003 2.391 1.027 2.822 1.17 3.013c.143.191 2.021 3.086 4.897 4.329.684.296 1.218.473 1.635.606.687.218 1.312.187 1.807.113.552-.083 1.696-.693 1.935-1.363s.239-1.244.167-1.363-.263-.215-.55-.359z"/>
                </svg>
                {params.lang === "pt" ? "Fale com um consultor" : "Fale Conosco"}
              </a>
              <Link
                href={`/${params.lang}/calculadora`}
                className="text-gray-900 font-bold px-10 py-5 rounded-full hover:bg-gray-50 transition-all uppercase tracking-widest text-sm border-2 border-gray-100"
              >
                {t.hero.cta}
              </Link>
            </div>
          </div>
        </div>

        {/* Hexagonal Composition - Left */}
        <div className="absolute left-0 top-1/2 -translate-y-12 -translate-x-20 hidden xl:block pointer-events-none select-none">
          <div className="relative">
            {/* Flag Hexagon */}
            <div 
              className="w-80 h-96 bg-gray-200 overflow-hidden shadow-2xl"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1543783232-f79f0c679b0e?auto=format&fit=crop&w=800&q=80" 
                alt="Spain"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Gabriela Hexagon */}
            <div 
              className="w-48 h-56 bg-brand-600 absolute -bottom-12 -right-12 overflow-hidden shadow-2xl border-4 border-white p-1"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            >
              <div 
                className="w-full h-full overflow-hidden"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                <img 
                  src="/gabriela.jpg" 
                  alt="Gabriela Pontes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Small Yellow Accent */}
            <div 
              className="w-16 h-16 bg-accent-yellow absolute top-20 -right-20 shadow-lg"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            />
          </div>
        </div>

        {/* Hexagonal Composition - Right */}
        <div className="absolute right-0 top-1/2 -translate-y-12 translate-x-20 hidden xl:block pointer-events-none select-none">
          <div className="relative">
            {/* Architecture Hexagon */}
            <div 
              className="w-96 h-[30rem] bg-gray-200 overflow-hidden shadow-2xl"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1559121010-41c3ad7a62b1?auto=format&fit=crop&w=800&q=80" 
                alt="Sevilla Architecture"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Solid Accent Hexagon */}
            <div 
              className="w-48 h-56 bg-accent-yellow/90 absolute top-10 -left-24 shadow-xl"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            />
          </div>
        </div>

        {/* Large Faint Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden -z-10">
          <span className="text-[20vw] font-black leading-none whitespace-nowrap uppercase tracking-tighter">
            PLANIFICA TU MUDANZA
          </span>
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
