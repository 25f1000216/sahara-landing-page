# SAHARA – The Social Welfare Society (IIT Madras BS)

Official website for SAHARA, built for the WebOps Recruitment 2026 assignment.
Single-page site: Hero, About, Framework, Events, Journey timeline, Testimonials, Team, Gallery (lightbox) and a secured contact form.

## Tech
React 18 + Vite, Tailwind CSS 3, Framer Motion, Lucide React.

## Run locally
```bash
npm install
cp .env.example .env     # then edit values
npm run dev              # http://localhost:5173
npm run build && npm run preview
```
Requires Node 18+.

## Assets
The official logo, event photos and team portraits supplied by SAHARA are in `public/images/` (logo: `sahara-logo.png`, also the favicon). Events without a supplied photo (e.g. Animal Aid Unlimited) show a labelled placeholder until you set `image` in `src/data/events.js`.

## Contact form setup
1. Create a free form at https://formspree.io and copy its endpoint (`https://formspree.io/f/xxxx`).
2. Put it in `.env` as `VITE_FORM_ENDPOINT=...`. On Vercel/Netlify add the same variable in project settings and redeploy.
3. In Formspree, enable spam filtering, and reCAPTCHA if you want stronger bot protection; restrict allowed domains to your site where available.
4. `VITE_FORM_TEST_MODE=true` (dev only, ignored in production builds) simulates a submission without sending data.
If the endpoint is missing or not `https`, the form shows a clear error and sends nothing.

### Form security measures
- Strict validation + sanitization (control/bidi characters stripped, length limits, allow-listed dropdown values, name/email pattern checks) on every submit.
- Honeypot field, minimum fill time (3s) and a 60s per-browser cooldown against bots and double sends.
- 12s request timeout, `credentials: 'omit'`, https-only endpoint, no `dangerouslySetInnerHTML` anywhere (React escapes all output).
- Content-Security-Policy, HSTS, `X-Frame-Options`, `nosniff`, Referrer and Permissions policies via `vercel.json` / `netlify.toml` (a baseline CSP is also in `index.html` for GitHub Pages).
- Important: everything in a Vite `VITE_*` variable is public in the built JS, and client checks can be bypassed. The Formspree endpoint is designed to be public, but real abuse protection must come from Formspree's server-side settings above. Never put secret keys in `VITE_*` variables.
- If you add reCAPTCHA/Turnstile or another host to `connect-src`, update the CSP in all three places.

## Update content
- Events/timeline: `src/data/events.js` · Testimonials: `src/data/testimonials.js`
- Team: `src/data/team.js` (add `email` to show the mail icon, `photo` for a real portrait in `public/images/team/`)
- Gallery & event photos: put files in `public/images/` and set `src` / `image` in `src/data/gallery.js` and `events.js`. Entries without a photo show a labelled placeholder; only use genuine SAHARA photos.
- Social links, footer links: `src/config.js` (official email, Instagram, LinkedIn and YouTube are set; Constitution, Privacy Policy, Code of Conduct and Website Code links are empty and show "coming soon" until you add URLs).

## Deploy
- **Vercel / Netlify:** import the repo, build `npm run build`, output `dist`, add the env variable. Security headers are applied automatically.
- **GitHub Pages:** set `VITE_BASE=/<repo-name>/` when building, publish `dist` (e.g. with a GitHub Action). Custom headers aren't supported there, so the meta CSP applies.

## Push to your existing GitHub repo
```bash
git init && git add . && git commit -m "SAHARA website"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
(`.env` is git-ignored — never commit it.)
