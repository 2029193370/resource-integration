$ErrorActionPreference = "Stop"

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  Write-Error "npx is required. Please install Node.js first."
}

if (-not (Test-Path ".vercel/project.json")) {
  Write-Host "Vercel project is not linked yet. Starting vercel link..."
  npx vercel link
}

npm ci
npx vercel pull --yes --environment=production
npm run lint
npm run test
npm run build
npx vercel deploy --prod --yes
