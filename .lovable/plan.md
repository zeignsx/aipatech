## Goal
Polish the entire site with a glassmorphism design system, harden security, separate admin vs customer login flows, expand rentals, and verify every route works on both Lovable preview and Netlify.

## 1. Design system overhaul (glassmorphism)
- Refresh `src/styles.css`: richer gradient tokens, deeper glass utilities (`glass`, `glass-strong`, `glass-dark` already exist — extend with `glass-card`, `glass-hero`, animated gradient mesh background, noise texture overlay).
- Add subtle motion: float, shimmer, gradient-pan keyframes.
- Replace flat cards across pages with glass surfaces; layer translucent panels over a colorful blurred background.

## 2. Pages to rebuild visually
- Landing (`/`): glass hero with mesh gradient + floating equipment imagery, glass feature cards, glass testimonials marquee, glass CTA.
- About / Services / Projects / Clients / HSE-S / Contact: unified glass page-hero with gradient mesh + glass content cards.
- Rentals (`/rentals`): glass fleet cards with hover tilt, glass booking aside, category filter chips, search bar, sort by price.
- Auth (`/auth`): glass login card on gradient backdrop; on submit, role-check and route admins to `/dashboard`, regular users to `/portal`.
- Header/footer: glass sticky header with backdrop blur, refined mobile drawer.

## 3. Separate admin vs customer dashboards
- After login: query `has_role(uid,'admin')`. Admins → `/dashboard` (admin shell). Non-admins → `/portal` (customer shell). Block customers from `/dashboard/*` and admins are free to visit `/portal` if needed.
- Customer portal (`/portal`): glass cards for active bookings, history, notifications, profile, quick re-book CTA.
- Admin shell (`_app/*`): cleaner sidebar with sectioned nav (Operations, Catalog, Content, Account), top bar with search + notifications.

## 4. Rentals feature expansion
- Add filters (category, price range), search, sort.
- Add availability badge, featured flag (new rental column `featured boolean`).
- Admin manage-rentals: bulk toggle active, drag-free position editor (number input is fine), image upload to `site-images` bucket.
- Allow rental detail mini-modal with full description before booking.

## 5. Security tightening
- Run Supabase linter; resolve warnings.
- Confirm RLS on all tables (already in place per schema).
- Add migration: `featured` column on rentals; ensure storage bucket policies remain admin-write/public-read.
- Keep HIBP password protection on.

## 6. Netlify + preview compatibility
- Verify `netlify.toml` (publish=`dist/client` for TanStack Start build output) and `_redirects`.
- Ensure no server-only imports leak to client; routes are file-based; no hash routing.
- Smoke-test all routes: `/`, `/about`, `/services`, `/projects`, `/clients`, `/hses`, `/contact`, `/rentals`, `/auth`, `/reset-password`, `/portal`, `/dashboard`, `/bookings`, `/manage-rentals`, `/invoices`, `/invoices/new`, `/customers`, `/site-content`, `/settings`.

## Technical details
- TanStack Start file-based routes; do not edit `routeTree.gen.ts`.
- Tailwind v4 tokens in `src/styles.css` only.
- Use `useIsAdmin` hook for role gating; add redirect logic in `auth.tsx` post-login and a guard in `_app.tsx` that bounces non-admins to `/portal`.
- All design tokens via CSS variables — no hard-coded colors in components.

## Out of scope
- New backend integrations (email/SMS providers) beyond existing WhatsApp/Gmail handoff.
- Payment processing.
