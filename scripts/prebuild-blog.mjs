#!/usr/bin/env node
/**
 * Pre-generates blog post data into a JSON file so pages can be bundled
 * for the Edge Runtime without needing Node.js `fs`/`path` modules.
 *
 * Run before next build: node scripts/prebuild-blog.mjs
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_DIR = path.join(process.cwd(), "src", "generated");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "blogData.json");

const files = fs.existsSync(BLOG_DIR)
  ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
  : [];

const posts = await Promise.all(
  files.map(async (filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filepath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filepath, "utf-8");
    const { data, content } = matter(fileContent);

    const processed = await remark().use(html).process(content);
    const htmlContent = processed.toString();

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Plano Espanha",
      category: data.category || "Geral",
      image: data.image || null,
      tags: data.tags || [],
      content: htmlContent,
    };
  })
);

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
console.log(`✅ Blog pre-build: ${posts.length} post(s) → ${OUTPUT_FILE}`);
