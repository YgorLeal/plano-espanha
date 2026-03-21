import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Locale, locales } from "@/lib/i18n";
import { siteName, siteUrl, toJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Planeje sua mudança para a Espanha",
    template: `%s | ${siteName}`,
  },
  description:
    "Calculadora de custo de vida, simulador de visto e guias completos para brasileiros que querem morar na Espanha.",
  applicationName: siteName,
  category: "Immigration",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: ["https://twitter.com/planoespanha"],
};

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema) }}
        />
        <Header lang={params.lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={params.lang} />
      </body>
    </html>
  );
}
