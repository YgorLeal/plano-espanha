/**
 * Edge-compatible blog module.
 * Reads from pre-generated JSON (created by scripts/prebuild-blog.mjs)
 * instead of using Node.js `fs`/`path` — required for Cloudflare Pages.
 */

import postsData from "@/generated/blogData.json";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image?: string | null;
  tags: string[];
  content: string;
}

export type BlogPostMeta = Omit<BlogPost, "content">;

const posts = postsData as BlogPost[];

export function getAllPosts(): BlogPostMeta[] {
  return posts.map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
