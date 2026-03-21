interface Env {
  VIEWS: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet = async (context: PagesContext): Promise<Response> => {
  const list = await context.env.VIEWS.list({ prefix: "views:" });

  const views: Record<string, number> = {};
  for (const key of list.keys) {
    const slug = key.name.replace("views:", "");
    const value = parseInt((await context.env.VIEWS.get(key.name)) ?? "0", 10);
    views[slug] = value;
  }

  return new Response(JSON.stringify({ views }), {
    headers: CORS_HEADERS,
  });
};
