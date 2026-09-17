---
name: new-hx-app
description: Scaffold a new htmx+JSDoc consumer app on JakobMelchard/core (file-based data, Store adapters, shared CI). Use when starting a new app of this kind.
---
Reference consumer: JakobMelchard/lift. Copy its shape, not its domain.

1. Layout: `src/{app.js,views.js,paths.js,types.js}`, `serve.js`, `data/` fixtures, `test/*.test.js`, `e2e/*.test.js`, `.github/workflows/ci.yml` (caller of `JakobMelchard/.github` `node.yml@main`), `.devcontainer/devcontainer.json` from core `templates/hx-app`.
2. `app.js` exports `handle = router([...])` only. All I/O via `env.store`. One file per record, single writer.
3. Unit tests drive `handle` with `memoryStore`; e2e drives `serve.js` on temp copy of `data/`.
4. Add `{repo, ref}` to core `consumers.json` (PR to core).
5. Run `upgrade-core` to sync skills.
