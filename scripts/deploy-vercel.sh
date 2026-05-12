#!/usr/bin/env bash
set -euo pipefail

required_vars=(DATABASE_URL SESSION_SECRET ADMIN_USERNAME ADMIN_PASSWORD)

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "Missing required environment variable: ${var_name}" >&2
    exit 1
  fi
done

npm ci
npm run lint
npm run test
npm run build
npx prisma migrate deploy
npx prisma db seed
npx vercel deploy --prod
