# Syed Fareed Ul Hassan — Portfolio Website

A portfolio website (`index.html`) with a full admin dashboard (`admin.html`).
Everything — text, photos, colors, animations, social media, and new sections — is edited from the dashboard. You don't need to change any code.

## Files

| File | What it is |
|---|---|
| `index.html` | The public website |
| `admin.html` | Admin dashboard (login required) |
| `site-config.js` | Supabase keys, admin email and default content. **Both pages need it.** |
| `supabase/setup.sql` | Database setup (run once in Supabase) |
| `supabase/functions/social-feed/index.ts` | Auto-feed function for YouTube / Instagram / Facebook |

Keep all files in the **same folder structure** when you upload them to GitHub.

## One-time setup

1. **GitHub:** upload all files to your repository. Then go to **Settings → Pages → Deploy from branch → main / root**.
2. **Database:** open `admin.html` → *View Setup Guide* (or Supabase → SQL Editor). Paste `supabase/setup.sql` and click **Run**.
3. **Admin user:** in Supabase, go to **Authentication → Users → Add user**. Use `fareedulhassan0@gmail.com`, set a password and tick *Auto confirm*.
4. **Gmail:** submit the contact form once. FormSubmit will send an activation email; click **Activate** in it.
5. **Auto-feeds (optional):** in Supabase, go to **Edge Functions → Deploy a new function → Via Editor**. Name it `social-feed`, paste `supabase/functions/social-feed/index.ts` and click **Deploy**.

Admin → **Supabase Setup → Run check** confirms that every step is working.

## Social media (Admin → Social Media)

- All 19 platforms start **inactive**. When you switch one on and paste your link, its icon appears on the site (hero, footer, contact, optional floating bar).
- **YouTube:** turn on *auto-feed*, paste your channel link and click *Test connection*. New uploads then appear on the site automatically (refreshed every 30 minutes). No API key is needed.
- **Instagram:** needs a free Professional account and a one-time access token. Step-by-step instructions are in the dashboard. The token renews itself automatically.
- **Facebook Page:** there are two options:
  - **Timeline widget:** no token needed.
  - **Photo grid:** needs a Page token.
- **TikTok:** uses the official profile embed. No token needed.
- **LinkedIn and anything else:** go to *Featured Posts & Uploads* and paste the post link, or upload your own photo or video.

## New sections (Admin → Page Builder)

There are 11 section types you can add:
- Projects
- Achievements
- Featured spotlight
- Gallery
- Videos
- Timeline
- Testimonials
- FAQ
- Text block
- Call-to-action banner
- Logos

In the Page Builder you can also reorder any section, show or hide it, and rename menu items. Click **Publish** to make your changes live.
