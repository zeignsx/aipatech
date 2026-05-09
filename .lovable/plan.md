# Build Plan — Auth, Admin, Image CMS & Dashboard

## 1. Login credentials (provided now, no rebuild needed)
- **Email:** `admin@ael.com`
- **Password:** `Ael2022`
- Already provisioned with `admin` role in `user_roles`. I will re-seed the account if missing so login is guaranteed to work on first try.

## 2. Auth page (`/auth`)
- Add a tabbed Sign In / Sign Up flow with proper buttons:
  - "Sign in" (primary)
  - "Create account" (toggles to signup form: full name, email, password, confirm)
  - "Forgot password?" (sends reset email via `resetPasswordForEmail`)
- Keep glassy hero side, add "Continue as guest → back to site" link.
- Show inline validation + toast feedback (sonner).
- New `/reset-password` route to complete password recovery.

## 3. Admin Dashboard navigation (every route works)
Sidebar in `_app.tsx` will include and route to:
- Dashboard (KPIs, charts) — already exists, will enrich
- Bookings — exists
- Invoices — exists
- Customers — exists
- **Site Content (new)** — image CMS (see §4)
- **Settings (new)** — profile, password change, theme
- Sign out

Each link uses TanStack `<Link>` with active state; admin guard via `has_role('admin')` check on mount → redirect to `/auth` if not admin.

## 4. Image Management System (CMS for site images)
**Backend**
- New storage bucket `site-images` (public read, admin write).
- New table `public.site_images`:
  - `key` (unique slug, e.g. `hero`, `rentals_cover`, `about_team`)
  - `url` (public storage URL)
  - `alt`, `updated_at`, `updated_by`
- RLS: anyone can read; only admins insert/update/delete.
- Seed rows for every replaceable slot used on the public site.

**Admin UI** at `/site-content`
- Grid of image slots. Each card shows current image + "Replace" button.
- Replace flow: file picker → upload to `site-images/{key}-{timestamp}.{ext}` → update row → live preview.
- Optional alt-text editor + "Reset to default".

**Public site integration**
- New hook `useSiteImage(key, fallback)` that reads from `site_images` (with fallback to bundled asset so SSR & first paint never break).
- Wire hero, rentals fleet, about, etc. through the hook so admin edits propagate immediately.

## 5. Enriched user/admin dashboard
- KPI strip: Revenue (YTD), Outstanding, Bookings (30d), Active customers.
- Revenue 6-mo bar chart (existing) + invoice status donut.
- Recent activity feed (latest 8 bookings/invoices, realtime).
- Quick actions: New invoice, New customer, Open bookings inbox.
- Outstanding invoices table (top 5 overdue) with one-click "Mark paid".

## Technical notes
- Migration creates `site_images` table, `site-images` bucket, RLS policies, and seeds default keys.
- Admin guard implemented via a small `useIsAdmin()` hook that calls `has_role` RPC; redirects unauthorized users.
- All new UI uses semantic tokens from `src/styles.css` (no raw colors).
- No edits to auto-generated files (`client.ts`, `types.ts`, `routeTree.gen.ts`).

After approval I'll execute migration → seed → code in one pass.