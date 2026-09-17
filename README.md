# core

Platform for minimal htmx 4 + JSDoc apps that run as Node server, Cloudflare Worker, or in-page (Android/offline).

- `src/handle.js` router `(Request, Env) → Response` · `src/transport.js` in-page htmx transport · `src/store/*` Store adapters + `runStoreContract` · `src/html.js` · `src/tags.js`
- `.github/workflows/js-check.yml` reusable CI · `consumers-e2e.yml` runs every repo in `consumers.json` against a core sha
- `githooks/` · `templates/hx-app/` devcontainer · `agents/skills/` promote-pattern, upgrade-core, new-hx-app, add-store-adapter
- Design: `SPEC.md` · roadmap prompts: `PROMPTS.md`

Status: P1, P2, core of P7/P8 done. Next: P5 (R2 store), P6 (SAF store + Capacitor).

```
npm ci && npx tsc && npm test && npm run e2e   # e2e: CHROMIUM_PATH=/path/to/chrome if needed
```
