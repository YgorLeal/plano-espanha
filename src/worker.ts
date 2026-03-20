type Env = {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
};

const locales = ["pt", "es", "en"] as const;

function getLocale(acceptLanguage: string | null): (typeof locales)[number] {
  const header = acceptLanguage?.toLowerCase() ?? "";

  if (header.includes("es")) return "es";
  if (header.includes("en")) return "en";

  return "pt";
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    const hasLocale = locales.some(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (!hasLocale && !pathname.startsWith("/_next") && !pathname.startsWith("/api") && !pathname.includes(".")) {
      const locale = getLocale(request.headers.get("accept-language"));
      return Response.redirect(new URL(`/${locale}${pathname}`, url), 302);
    }

    return env.ASSETS.fetch(request);
  },
};
