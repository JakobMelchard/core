# cloudflare-core — shared CF infra (Pages + Workers)

```sh
git clone --depth 1 https://github.com/JakobMelchard/cloudflare-core.git my-project
cd my-project
rm -rf .git
git init
```

Seeds hooks, configs, and release-please workflow.

## Hooks

- **pre-commit**: gitleaks → make validate → make build → make test
- **pre-push**: make deploy
