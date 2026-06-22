# cloudflare-core — shared CF infra (Pages + Workers)

```sh
curl -sL https://raw.githubusercontent.com/JakobMelchard/cloudflare-core/main/install.sh | bash
```

Seeds hooks, configs, and release-please workflow.

## Hooks

- **pre-commit**: gitleaks → make validate → make build → make test
- **pre-push**: make deploy
