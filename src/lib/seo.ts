import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { BlogPost } from "@/lib/blogEdge";

export const siteUrl = "https://planoespanha.com";
export const siteName = "Plano Espanha";
const defaultOgImage = "/og-image.png";

const localeLabels: Record<Locale, string> = {
  pt: "pt-BR",
  es: "es-ES",
  en: "en-US",
};

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function absoluteUrl(path: string): string {
  return new URL(normalizePath(path), siteUrl).toString();
}

export function buildAlternates(pathByLocale: Record<Locale, string>) {
  return {
    languages: {
      "pt-BR": absoluteUrl(pathByLocale.pt),
      "es-ES": absoluteUrl(pathByLocale.es),
      "en-US": absoluteUrl(pathByLocale.en),
      "x-default": absoluteUrl(pathByLocale.pt),
    },
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  pathByLocale,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathByLocale: Record<Locale, string>;
}): Metadata {
  const canonical = absoluteUrl(pathByLocale[locale]);

  return {
    title,
    description,
    alternates: {
      canonical,
      ...buildAlternates(pathByLocale),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: localeLabels[locale],
      type: "website",
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@planoespanha",
    },
  };
}

export function buildBlogPostMetadata({
  locale,
  post,
}: {
  locale: Locale;
  post: BlogPost;
}): Metadata {
  const pathByLocale = {
    pt: `/pt/blog/${post.slug}/`,
    es: `/es/blog/${post.slug}/`,
    en: `/en/blog/${post.slug}/`,
  } satisfies Record<Locale, string>;
  const canonical = absoluteUrl(pathByLocale[locale]);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
      ...buildAlternates(pathByLocale),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName,
      locale: localeLabels[locale],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.image || defaultOgImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      site: "@planoespanha",
    },
  };
}

export function localizePostContent(content: string, locale: Locale): string {
  return content.replace(/href="\/(calculadora|simulador|blog)(\/)?"/g, 'href="/' + locale + '/$1/"');
}

export function toJsonLd(data: unknown) {
  return JSON.stringify(data);
}
