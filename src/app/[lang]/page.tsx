import Link from "next/link";
import { getDictionary, Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blog";

export const runtime = 'edge';

export default async function Home({ params }: { params: { lang: Locale } }) {
  const t = await getDictionary(params.lang);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-orange-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              {t.hero.title.split("Espanha")[0]}
              <span className="text-brand-600">Espanha</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${params.lang}/calculadora`}
                className="bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-center hover:bg-brand-700 transition shadow-lg shadow-brand-200"
              >
                {t.hero.cta}
              </Link>
              <Link
                href={`/${params.lang}/simulador`}
                className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl text-center hover:border-brand-400 hover:text-brand-600 transition"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100 rounded-full opacity-30 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-yellow-100 rounded-full opacity-40 blur-3xl -z-10" />
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {t.features.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
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
              className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-brand-200 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
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
