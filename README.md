# Personal Website v2 (Next.js + Vercel)

Modern, Vercel-first rebuild of the personal site using Next.js App Router, TypeScript, Tailwind CSS v4, and shadcn-style UI primitives.

## Project Structure

- `app/` - routes, layout, metadata, sitemap, robots
- `components/` - layout shell, UI primitives, section components
- `content/` - typed content data and markdown sources
- `lib/` - utilities, content loading, SEO helpers
- `public/` - static assets
- `tests/` - Vitest test suites

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SITE_URL=https://yumingyang.com
WRITING_RSS_FEED_URL=https://alanyang0.substack.com/feed
PODCAST_RSS_FEED_URL=https://your-podcast-rss-feed.xml
```

Notes:
- `WRITING_RSS_FEED_URL` defaults to your Substack feed if omitted.
- `PODCAST_RSS_FEED_URL` should be your Spotify podcast RSS feed URL.
- If a feed is unavailable, the app falls back to local markdown content.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deploy to Vercel

1. Push repository to GitHub.
2. In Vercel, create a new project and select the repository.
3. Keep **Root Directory** as project root (`.`), since this repository is the app itself.
4. Confirm build settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: default (Next.js)
5. Add environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://yumingyang.com`
   - `WRITING_RSS_FEED_URL=https://alanyang0.substack.com/feed`
   - `PODCAST_RSS_FEED_URL=<your-podcast-rss-feed>`
6. Deploy to preview.
7. Add custom domains in Vercel:
   - `yumingyang.com`
   - `www.yumingyang.com`
   - `yumingyang.net`
   - `www.yumingyang.net`
8. Set `yumingyang.com` as the primary domain in Vercel.
9. Update DNS records to Vercel targets and enable HTTPS.
10. Validate redirects:
    - legacy path aliases (for example `/connect` -> `/contact`)
    - alternate domains (`yumingyang.net`, `www.yumingyang.net`, `www.yumingyang.com`) -> `https://yumingyang.com`

## SEO and Accessibility Checklist

- Route-level metadata + canonical tags
- OpenGraph/Twitter metadata in global + per-page metadata
- `sitemap.xml` via `app/sitemap.ts`
- `robots.txt` via `app/robots.ts`
- Semantic landmarks (`header`, `nav`, `main`, `footer`)
- Skip-to-content link
- Keyboard-friendly mobile navigation
- Visible focus styles and high-contrast palette

## Migration Notes

- Legacy Jekyll code remains in `Github/Yuming-Yang.github.io` as archive/reference.
- This v2 app is the deployment target.
- Missing data is intentionally marked with `TODO` / `PLACEHOLDER` labels to avoid inventing credentials.
- Asset hydration note: original legacy profile/favicon binaries may need manual restoration; see `public/images/ASSET_MIGRATION_TODO.md`.

## Final Verification Checklist

- [ ] All nav/footer links resolve correctly
- [ ] Writing and podcast detail routes render by slug
- [ ] Mobile layout and menu interaction behave correctly
- [ ] Metadata, sitemap, and robots endpoints are present
- [ ] Lighthouse and accessibility checks reviewed before production launch
- [ ] Vercel production domain + redirects validated
