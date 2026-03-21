import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/blogEdge";
import { getDictionary, Locale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { buildBlogPostMetadata, localizePostContent } from "@/lib/seo";
import ViewCounter from "@/components/ViewCounter";
import ContentFeedback from "@/components/ContentFeedback";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return buildBlogPostMetadata({
    locale: params.lang,
    post,
  });
}

export default async function BlogPost({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  const t = await getDictionary(params.lang);
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href={`/${params.lang}/blog`}
        className="text-sm text-brand-600 hover:text-brand-700 font-medium mb-6 inline-block"
      >
        ← {t.blog.backToBlog}
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-50 shadow-sm">
            <img src="/gabriela.jpg" alt="Gabriela Pontes" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] block mb-1">Autor</span>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter font-heading leading-none">Gabriela Pontes</h3>
          </div>
          <div className="h-10 w-px bg-gray-100 mx-2" />
          <div className="text-left">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Publicado em</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
              {new Date(post.date).toLocaleDateString(params.lang)}
            </span>
          </div>
          <div className="h-10 w-px bg-gray-100 mx-2" />
          <div className="text-left">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">
              {params.lang === "pt" ? "Visualizações" : params.lang === "es" ? "Visitas" : "Views"}
            </span>
            <ViewCounter slug={params.slug} lang={params.lang} />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-black text-white bg-brand-600 px-3 py-1 uppercase tracking-widest">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter font-heading mb-6">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-brand-600 pl-6">
            {post.description}
          </p>
        )}
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: localizePostContent(post.content, params.lang) }}
      />

      <ContentFeedback slug={`blog:${post.slug}`} lang={params.lang} />

      {/* CTA */}
      <div className="mt-12 bg-brand-50 rounded-xl p-8 text-center border border-brand-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {params.lang === "pt"
            ? "Quer números personalizados?"
            : params.lang === "es"
            ? "¿Quieres números personalizados?"
            : "Want personalized numbers?"}
        </h3>
        <p className="text-gray-600 mb-4">
          {params.lang === "pt"
            ? "Use nossa calculadora gratuita e descubra quanto custa viver na Espanha para o seu perfil."
            : params.lang === "es"
            ? "Usa nuestra calculadora gratuita y descubre cuánto cuesta vivir en España para tu perfil."
            : "Use our free calculator and find out how much it costs to live in Spain for your profile."}
        </p>
        <Link
          href={`/${params.lang}/calculadora`}
          className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition"
        >
          {params.lang === "pt"
            ? "Calcular agora"
            : params.lang === "es"
            ? "Calcular ahora"
            : "Calculate now"}
        </Link>
      </div>
    </article>
  );
}
