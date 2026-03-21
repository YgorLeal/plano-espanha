interface Env {
  VIEWS: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
  params: { slug: string };
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9_-]+$/i.test(slug);
}

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { slug } = context.params;

  if (!isValidSlug(slug)) {
    return new Response(JSON.stringify({ error: "Invalid slug" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const key = `views:${slug}`;
  const current = parseInt((await context.env.VIEWS.get(key)) ?? "0", 10);
  const next = current + 1;
  await context.env.VIEWS.put(key, String(next));

  return new Response(JSON.stringify({ views: next }), {
    headers: CORS_HEADERS,
  });
};

export const onRequestGet = async (context: PagesContext): Promise<Response> => {
  const { slug } = context.params;

  if (!isValidSlug(slug)) {
    return new Response(JSON.stringify({ error: "Invalid slug" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const key = `views:${slug}`;
  const current = parseInt((await context.env.VIEWS.get(key)) ?? "0", 10);

  return new Response(JSON.stringify({ views: current }), {
    headers: CORS_HEADERS,
  });
};
