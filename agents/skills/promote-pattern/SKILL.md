---
name: promote-pattern
description: Move a pattern from a consumer app (src/_candidate/<name>/) into JakobMelchard/core. Use when a consumer grows reusable code, or asked to "promote"/"upstream" something.
---
Criteria (all): used by ≥2 consumers OR is a Store/transport/CI seam; has tests; no app domain names.

1. In consumer: confirm `src/_candidate/<name>/` + test exist. Else stop, report.
2. In core: branch `promote/<name>`. Move code to `src/<name>.js`, generalize names, add `exports` entry in package.json.
3. Add contract-style test (`export const run<Name>Contract`) if consumers implement an interface.
4. `npx tsc && npm test && npm run e2e` green.
5. Bump minor in package.json. PR body: origin consumer + commit, API, migration.
6. CI green before merge. Never merge red.
7. After release tag: run `upgrade-core` in every consumer; delete `_candidate` copy.
