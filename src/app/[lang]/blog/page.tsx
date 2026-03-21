import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blogEdge";
import { getDictionary, Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import BlogPostList from "@/components/BlogPostList";

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
        <BlogPostList
          posts={posts.map((p) => ({
            slug: p.slug,
            title: p.title,
            description: p.description,
            date: p.date,
            category: p.category,
          }))}
          lang={params.lang}
          readMoreLabel={t.blog.readMore}
        />
      )}
    </section>
  );
}
