---
name: upgrade-core
description: Upgrade a consumer repo to a newer JakobMelchard/core tag and resync agent skills. Use on Renovate PRs for core or when asked to update core.
---
1. `npm i github:JakobMelchard/core#<tag>`; update `uses: JakobMelchard/core/...@<tag>` refs in `.github/workflows/*`.
2. `rm -rf .agents/skills && cp -r node_modules/@jakobmelchard/core/agents/skills .agents/skills` (copy, not symlink: sandboxed agents do not follow links out of repo).
3. Read core CHANGELOG/PR bodies since old tag; apply migrations; delete any `src/_candidate/*` now provided by core.
4. `npx tsc && npm test && npm run e2e`. Commit `chore: core <old>→<tag>`.
