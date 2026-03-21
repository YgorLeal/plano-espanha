"use client";

import { useEffect, useState, useMemo } from "react";
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

interface Labels {
  readMore: string;
  allCategories: string;
  next: string;
  previous: string;
}

const POSTS_PER_PAGE = 5;

export default function BlogPostList({
  posts,
  lang,
  labels,
}: {
  posts: Post[];
  lang: Locale;
  labels: Labels;
}) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/views/")
      .then((r) => r.json())
      .then((data) => setCounts(data.views ?? {}))
      .catch(() => {});
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = posts.map((p) => p.category);
    return Array.from(new Set(cats)).sort();
  }, [posts]);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset page when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? "bg-brand-600 text-white shadow-md shadow-brand-100"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {labels.allCategories}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-brand-600 text-white shadow-md shadow-brand-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {currentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${lang}/blog/${post.slug}`}
            className="group block bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
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
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors uppercase tracking-tight font-heading leading-tight">
              {post.title}
            </h2>
            <p className="text-gray-600 line-clamp-2 mb-6 leading-relaxed">
              {post.description}
            </p>

            <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-auto">
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
                {labels.readMore} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* No Posts Message */}
      {currentPosts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">Nenhum post encontrado nesta categoria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
          >
            ← {labels.previous}
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  currentPage === page
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-100"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
          >
            {labels.next} →
          </button>
        </div>
      )}
    </div>
  );
}
