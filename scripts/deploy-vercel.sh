#!/usr/bin/env bash
set -euo pipefail

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required. Please install Node.js first." >&2
  exit 1
fi

if [[ ! -f ".vercel/project.json" ]]; then
  echo "Vercel project is not linked yet. Starting vercel link..."
  npx vercel link
fi

npm ci
npx vercel pull --yes --environment=production
npm run lint
npm run test
npm run build
npx vercel deploy --prod --yes
