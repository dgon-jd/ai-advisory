#!/usr/bin/env bash
# One-time deploy script for the AI Advisory webhook function
# Run from the repo root after: vercel login
set -euo pipefail

GITHUB_TOKEN=$(gh auth token)
VERCEL_PROJECT="ai-advisory"

echo "==> Linking Vercel project..."
vercel link --project "$VERCEL_PROJECT" --yes

echo "==> Setting GITHUB_TOKEN env var..."
echo "$GITHUB_TOKEN" | vercel env add GITHUB_TOKEN production

echo "==> Setting LEADS_REPO env var..."
echo "dgon-jd/leads-queue" | vercel env add LEADS_REPO production

echo "==> Deploying to production..."
vercel deploy --prod

echo ""
echo "DONE. Grab the deployment URL above and:"
echo "  1. Add to index.html inside <form>:"
echo '     <input type="hidden" name="_webhook" value="https://<YOUR-URL>/api/webhook" />'
echo "  2. Commit and push — Vercel will redeploy automatically."
