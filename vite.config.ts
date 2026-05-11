// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// On Netlify, build as a pure client-side SPA so dist/client/index.html is generated
// (the Cloudflare Workers SSR build embeds the HTML inside the worker bundle instead,
// causing the Netlify SPA fallback to fail with a 404).
// For Cloudflare Workers deployment, run vite build without NETLIFY=true set.
const isNetlify = !!process.env.NETLIFY;

export default defineConfig(
  isNetlify
    ? {
        // SPA build: no Cloudflare plugin, no server entry → dist/client/index.html is generated
        cloudflare: false,
        tanstackStart: {},
      }
    : {
        // Cloudflare Workers SSR build
        tanstackStart: {
          server: { entry: "server" },
        },
      },
);
