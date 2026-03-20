import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blogEdge";
import { getDictionary, Locale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const runtime = 'edge';

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

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(post.date).toLocaleDateString(params.lang)}
          </span>
          <span className="text-xs text-gray-400">• {post.author}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-lg text-gray-600 mt-3">{post.description}</p>
        )}
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

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
