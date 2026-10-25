// =====================================================================
// Supabase Edge Function: social-feed
// Fetches your latest YouTube videos, Instagram posts and Facebook Page
// posts so they appear on the portfolio website automatically.
//
// Deploy ONCE (no CLI needed):
//   Supabase Dashboard → Edge Functions → "Deploy a new function" → "Via Editor"
//   → name it exactly:  social-feed   → replace the sample code with this file → Deploy
//
// Secrets (Instagram / Facebook tokens) are saved from admin.html into the
// private "social_secrets" table — never exposed on the public website.
// Results are cached for 30 minutes in "social_cache".
// =====================================================================
import { createClient } from 'npm:@supabase/supabase-js@2';

const ADMIN_EMAIL = 'fareedulhassan0@gmail.com';
const SETTINGS_ID = 'main';
const CACHE_MINUTES = 30;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};
const json = (body: unknown) =>
  new Response(JSON.stringify(body), { headers: { ...cors, 'Content-Type': 'application/json' } });

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
});

type Item = {
  id: string; platform: string; type: string; title: string; text: string;
  thumb: string; media: string; url: string; date: string; album?: boolean;
};

async function getSecret(id: string) {
  const { data } = await db.from('social_secrets').select('value,updated_at').eq('id', id).maybeSingle();
  return data as { value: string; updated_at: string } | null;
}
async function setSecret(id: string, value: string) {
  await db.from('social_secrets').upsert({ id, value, updated_at: new Date().toISOString() });
}

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1].trim()) : '';
};
const BROWSER = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cookie': 'CONSENT=YES+cb; SOCS=CAI',
};

/* ---------------- YouTube (no API key needed) ---------------- */
async function resolveChannel(input: string): Promise<string> {
  const v = String(input || '').trim();
  if (/^UC[\w-]{22}$/.test(v)) return v;
  let m = v.match(/channel\/(UC[\w-]{22})/);
  if (m) return m[1];
  if (!v) throw new Error('Add your YouTube channel link or Channel ID.');
  const url = /^https?:\/\//.test(v) ? v : 'https://www.youtube.com/' + (v.startsWith('@') ? v : '@' + v);
  const r = await fetch(url, { headers: BROWSER });
  const html = await r.text();
  m = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/) ||
      html.match(/"externalId":"(UC[\w-]{22})"/) ||
      html.match(/"channelId":"(UC[\w-]{22})"/);
  if (!m) throw new Error('Could not find this YouTube channel. Paste the Channel ID (starts with UC) instead.');
  return m[1];
}

async function youtube(p: Record<string, string>) {
  const channelId = await resolveChannel(p.channelId || p.url);
  const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, { headers: BROWSER });
  if (!r.ok) throw new Error(`YouTube returned ${r.status}. Check the Channel ID.`);
  const xml = await r.text();
  const items: Item[] = xml.split('<entry>').slice(1).map((e) => {
    const id = tag(e, 'yt:videoId');
    const link = (e.match(/<link[^>]*href="([^"]+)"/) || [])[1] || `https://www.youtube.com/watch?v=${id}`;
    return {
      id, platform: 'youtube', type: 'video', title: tag(e, 'title'),
      text: tag(e, 'media:description').slice(0, 280),
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, media: '', url: decode(link), date: tag(e, 'published'),
    };
  });
  return { items, channelId };
}

/* ---------------- Instagram (Professional account + token) ---------------- */
async function instagram(): Promise<Item[]> {
  const s = await getSecret('instagram_token');
  if (!s?.value) throw new Error('Instagram access token is not saved yet (Admin → Social Media → Instagram).');
  let token = s.value;
  // Long-lived tokens last 60 days — refresh weekly so it never expires
  if (Date.now() - new Date(s.updated_at).getTime() > 7 * 86400000) {
    try {
      const r = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`);
      const j = await r.json();
      if (j.access_token) { token = j.access_token; await setSecret('instagram_token', token); }
    } catch { /* keep the current token */ }
  }
  const qs = new URLSearchParams({
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp', limit: '30', access_token: token,
  });
  const r = await fetch(`https://graph.instagram.com/me/media?${qs}`);
  const j = await r.json();
  if (j.error) throw new Error('Instagram: ' + (j.error.message || 'request failed'));
  // deno-lint-ignore no-explicit-any
  return (j.data || []).map((m: any): Item => ({
    id: m.id, platform: 'instagram', type: m.media_type === 'VIDEO' ? 'video' : 'image', title: '',
    text: String(m.caption || '').slice(0, 280),
    thumb: m.media_type === 'VIDEO' ? (m.thumbnail_url || '') : (m.media_url || ''),
    media: m.media_url || '', url: m.permalink, date: m.timestamp, album: m.media_type === 'CAROUSEL_ALBUM',
  }));
}

/* ---------------- Facebook Page (Page access token) ---------------- */
async function facebook(p: Record<string, string>): Promise<Item[]> {
  const s = await getSecret('facebook_token');
  if (!s?.value) throw new Error('Facebook Page access token is not saved yet (Admin → Social Media → Facebook).');
  const page = String(p.pageId || '').trim() || 'me';
  const qs = new URLSearchParams({
    fields: 'id,message,full_picture,permalink_url,created_time,attachments{media_type}', limit: '30', access_token: s.value,
  });
  const r = await fetch(`https://graph.facebook.com/${encodeURIComponent(page)}/posts?${qs}`);
  const j = await r.json();
  if (j.error) throw new Error('Facebook: ' + (j.error.message || 'request failed'));
  // deno-lint-ignore no-explicit-any
  return (j.data || []).filter((x: any) => x.full_picture || x.message).map((x: any): Item => {
    const mt = String(x.attachments?.data?.[0]?.media_type || '');
    return {
      id: x.id, platform: 'facebook', type: mt.includes('video') ? 'video' : x.full_picture ? 'image' : 'text', title: '',
      text: String(x.message || '').slice(0, 280), thumb: x.full_picture || '', media: x.full_picture || '',
      url: x.permalink_url, date: x.created_time,
    };
  });
}

/* ---------------- Handler ---------------- */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    // deno-lint-ignore no-explicit-any
    let body: any = {};
    if (req.method === 'POST') { try { body = await req.json(); } catch { body = {}; } }
    const q = new URL(req.url).searchParams;
    const platform = String(body.platform || q.get('platform') || '').toLowerCase();
    if (platform === 'ping') return json({ ok: true, pong: true });
    if (!['youtube', 'instagram', 'facebook'].includes(platform)) return json({ ok: false, error: 'Unknown platform' });

    // The admin "Test" button forces a refresh and may test unsaved settings
    let isAdmin = false;
    if (body.force) {
      const jwt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
      const { data } = await db.auth.getUser(jwt);
      isAdmin = (data?.user?.email || '').toLowerCase() === ADMIN_EMAIL.toLowerCase();
      if (!isAdmin) return json({ ok: false, error: 'Only the admin can run a test. Please log in again.' });
    }

    const { data: st } = await db.from('site_settings').select('data').eq('id', SETTINGS_ID).maybeSingle();
    let p = st?.data?.socials?.platforms?.[platform] || {};
    if (isAdmin && body.settings) p = { ...p, ...body.settings };
    if (!isAdmin && !(p.enabled && p.feed)) return json({ ok: false, error: `${platform} feed is turned off in the admin panel` });

    const source = platform === 'youtube' ? String(p.channelId || p.url || '') : platform === 'facebook' ? String(p.pageId || '') : 'me';
    const { data: cache } = await db.from('social_cache').select('data,source,fetched_at').eq('platform', platform).maybeSingle();
    const sameSource = cache && cache.source === source;
    if (!isAdmin && sameSource && Date.now() - new Date(cache.fetched_at).getTime() < CACHE_MINUTES * 60000) {
      return json({ ok: true, cached: true, items: cache.data });
    }

    try {
      let items: Item[] = [];
      let extra: Record<string, unknown> = {};
      if (platform === 'youtube') { const r = await youtube(p); items = r.items; extra = { channelId: r.channelId }; }
      else if (platform === 'instagram') items = await instagram();
      else items = await facebook(p);
      await db.from('social_cache').upsert({ platform, source, data: items, fetched_at: new Date().toISOString() });
      return json({ ok: true, items, ...extra });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!isAdmin && sameSource) return json({ ok: true, stale: true, items: cache.data, error: msg });
      return json({ ok: false, error: msg });
    }
  } catch (e) {
    return json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
});
