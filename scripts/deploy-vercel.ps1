$ErrorActionPreference = "Stop"

$requiredVars = @("DATABASE_URL", "SESSION_SECRET", "ADMIN_USERNAME", "ADMIN_PASSWORD")

foreach ($varName in $requiredVars) {
  if (-not [Environment]::GetEnvironmentVariable($varName)) {
    Write-Error "Missing required environment variable: $varName"
  }
}

npm ci
npm run lint
npm run test
npm run build
npx vercel deploy --prod
