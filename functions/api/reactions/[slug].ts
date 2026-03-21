interface Env {
  VIEWS: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
  params: { slug: string };
}

type ReactionType = "helpful" | "not_helpful";

interface ReactionCounts {
  helpful: number;
  not_helpful: number;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9_:-]+$/i.test(slug);
}

function isValidReactionType(type: unknown): type is ReactionType {
  return type === "helpful" || type === "not_helpful";
}

async function getCounts(kv: KVNamespace, key: string): Promise<ReactionCounts> {
  const raw = await kv.get(key);
  if (!raw) return { helpful: 0, not_helpful: 0 };
  try {
    return JSON.parse(raw) as ReactionCounts;
  } catch {
    return { helpful: 0, not_helpful: 0 };
  }
}

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet = async (context: PagesContext): Promise<Response> => {
  const { slug } = context.params;

  if (!isValidSlug(slug)) {
    return new Response(JSON.stringify({ error: "Invalid slug" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const key = `reactions:${slug}`;
  const counts = await getCounts(context.env.VIEWS, key);

  return new Response(JSON.stringify(counts), {
    headers: CORS_HEADERS,
  });
};

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { slug } = context.params;

  if (!isValidSlug(slug)) {
    return new Response(JSON.stringify({ error: "Invalid slug" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  let body: { type?: unknown };
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  if (!isValidReactionType(body.type)) {
    return new Response(JSON.stringify({ error: "Invalid reaction type" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const key = `reactions:${slug}`;
  const counts = await getCounts(context.env.VIEWS, key);
  counts[body.type] += 1;
  await context.env.VIEWS.put(key, JSON.stringify(counts));

  return new Response(JSON.stringify(counts), {
    headers: CORS_HEADERS,
  });
};
