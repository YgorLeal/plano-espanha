import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blogEdge";
import { absoluteUrl } from "@/lib/seo";
import { locales } from "@/lib/i18n";

const staticRoutes = ["", "blog", "calculadora", "simulador"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const pathname = route ? `/${locale}/${route}/` : `/${locale}/`;

      return {
        url: absoluteUrl(pathname),
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            "pt-BR": absoluteUrl(route ? `/pt/${route}/` : "/pt/"),
            "es-ES": absoluteUrl(route ? `/es/${route}/` : "/es/"),
            "en-US": absoluteUrl(route ? `/en/${route}/` : "/en/"),
          },
        },
      };
    })
  );

  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: absoluteUrl(`/${locale}/blog/${post.slug}/`),
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "pt-BR": absoluteUrl(`/pt/blog/${post.slug}/`),
          "es-ES": absoluteUrl(`/es/blog/${post.slug}/`),
          "en-US": absoluteUrl(`/en/blog/${post.slug}/`),
        },
      },
    }))
  );

  return [...staticEntries, ...blogEntries];
}
