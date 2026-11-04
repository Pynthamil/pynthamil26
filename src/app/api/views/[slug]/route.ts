import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VIEWS_FILE = path.join(process.cwd(), 'src', 'data', 'views.json');

// In-memory store fallback for serverless runtime
const globalViewsRef = globalThis as unknown as { __portfolioViews?: Record<string, number> };
if (!globalViewsRef.__portfolioViews) {
  globalViewsRef.__portfolioViews = {};
}

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

async function getViewsFromUpstash(config: { url: string; token: string }, slug: string, incr: boolean): Promise<number | null> {
  try {
    const endpoint = incr ? `${config.url}/hincrby/portfolio_views/${slug}/1` : `${config.url}/hget/portfolio_views/${slug}`;
    const res = await fetch(endpoint, {
      method: incr ? 'POST' : 'GET',
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      const val = Number(data?.result);
      if (!isNaN(val)) return val;
    }
  } catch (err) {
    console.error("Failed to update views in Upstash:", err);
  }
  return null;
}

function getViewsData(): Record<string, number> {
  try {
    if (fs.existsSync(VIEWS_FILE)) {
      const content = fs.readFileSync(VIEWS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object') {
        globalViewsRef.__portfolioViews = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading views file:", e);
  }
  return globalViewsRef.__portfolioViews || {};
}

function saveViewsData(data: Record<string, number>) {
  globalViewsRef.__portfolioViews = data;
  try {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    // Ephemeral serverless fallback
  }
}

// Optional: Fetch exact count from PostHog HogQL API if Personal API key is configured
async function getPostHogPageviews(slug: string): Promise<number | null> {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey || !projectId) return null;

  try {
    const res = await fetch(`${host}/api/projects/${projectId}/query/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: `SELECT count() FROM events WHERE event = '$pageview' AND properties.$pathname LIKE '%${slug}%'`
        }
      }),
      cache: 'no-store'
    });

    if (res.ok) {
      const data = await res.json();
      const count = data?.results?.[0]?.[0];
      if (typeof count === 'number') return count;
    }
  } catch (e) {
    console.error("Error querying PostHog API:", e);
  }
  return null;
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const { searchParams } = new URL(request.url);
  const shouldIncrement = searchParams.get('incr') === 'true';

  // 1. Try fetching real count from PostHog if API key is present
  const phCount = await getPostHogPageviews(slug);
  if (phCount !== null) {
    return NextResponse.json({ views: phCount });
  }

  // 2. Try Upstash Redis if configured
  const upstash = getUpstashConfig();
  if (upstash) {
    const redisCount = await getViewsFromUpstash(upstash, slug, shouldIncrement);
    if (redisCount !== null) {
      return NextResponse.json({ views: redisCount });
    }
  }

  // 3. Real dynamic view counter (starts at 0, increments per actual visitor page load)
  const data = getViewsData();
  let currentViews = data[slug] ?? 0;

  if (shouldIncrement) {
    currentViews += 1;
    data[slug] = currentViews;
    saveViewsData(data);
  }

  return NextResponse.json({ views: currentViews });
}
