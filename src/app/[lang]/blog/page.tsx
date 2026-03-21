import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blogEdge";
import { getDictionary, Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

const blogMetadata: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Blog sobre morar na Espanha",
    description:
      "Guias sobre vistos, custo de vida, documentos e planejamento para brasileiros que querem morar na Espanha.",
  },
  es: {
    title: "Blog sobre vivir en Espana",
    description:
      "Guias sobre visados, coste de vida, documentos y planificación para brasileños que quieren vivir en Espana.",
  },
  en: {
    title: "Blog about living in Spain",
    description:
      "Guides about visas, cost of living, documents and planning for Brazilians moving to Spain.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const meta = blogMetadata[params.lang];

  return buildPageMetadata({
    locale: params.lang,
    title: meta.title,
    description: meta.description,
    pathByLocale: {
      pt: "/pt/blog/",
      es: "/es/blog/",
      en: "/en/blog/",
    },
  });
}

export default async function BlogPage({ params }: { params: { lang: Locale } }) {
  const t = await getDictionary(params.lang);
  const posts = getAllPosts();

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{t.blog.title}</h1>
        <p className="text-lg text-gray-600">{t.blog.subtitle}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum post ainda.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${params.lang}/blog/${post.slug}`}
              className="block bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString(params.lang)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight font-heading">{post.title}</h2>
              <p className="text-gray-600 line-clamp-2 mb-6">{post.description}</p>
              
              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                    <img src="/gabriela.jpg" alt="Gabriela Pontes" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block leading-none mb-1">Escrito por</span>
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">Gabriela Pontes</span>
                  </div>
                </div>
                <span className="text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                  {t.blog.readMore} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
