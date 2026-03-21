type CfRequest = Request & {
  cf?: {
    country?: string;
  };
};

type PagesContext = {
  request: CfRequest;
  next: () => Promise<Response>;
};

const locales = ["pt", "es", "en"] as const;

function getLocaleFromCountry(country?: string): (typeof locales)[number] | null {
  switch (country) {
    case "BR":
      return "pt";
    case "ES":
      return "es";
    case "US":
      return "en";
    default:
      return null;
  }
}

function getLocaleFromLanguage(acceptLanguage: string | null): (typeof locales)[number] {
  const header = acceptLanguage?.toLowerCase() ?? "";

  if (header.includes("es")) return "es";
  if (header.includes("en")) return "en";

  return "pt";
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (
    !hasLocale &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.includes(".")
  ) {
    const locale =
      getLocaleFromCountry(context.request.cf?.country) ??
      getLocaleFromLanguage(context.request.headers.get("accept-language"));

    return Response.redirect(new URL(`/${locale}${pathname}`, url), 302);
  }

  return context.next();
};
