"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const viewLabels: Record<Locale, string> = {
  pt: "visualizações",
  es: "visitas",
  en: "views",
};

export default function BlogPostList({
  posts,
  lang,
  readMoreLabel,
}: {
  posts: Post[];
  lang: Locale;
  readMoreLabel: string;
}) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/views/")
      .then((r) => r.json())
      .then((data) => setCounts(data.views ?? {}))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/${lang}/blog/${post.slug}`}
          className="block bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString(lang)}
            </span>
            {counts[post.slug] !== undefined && (
              <>
                <span className="text-xs text-gray-300">·</span>
                <span className="text-xs text-gray-400">
                  {counts[post.slug].toLocaleString(lang)} {viewLabels[lang]}
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight font-heading">
            {post.title}
          </h2>
          <p className="text-gray-600 line-clamp-2 mb-6">{post.description}</p>

          <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                <img
                  src="/gabriela.jpg"
                  alt="Gabriela Pontes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block leading-none mb-1">
                  Escrito por
                </span>
                <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">
                  Gabriela Pontes
                </span>
              </div>
            </div>
            <span className="text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
              {readMoreLabel} →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
