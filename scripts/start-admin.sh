#!/bin/sh
# Railway start: update the database first, then start the admin.
set -e

export DIRECT_URL="${DIRECT_URL:-$DATABASE_URL}"

pnpm --filter @fano/db exec prisma db push --skip-generate
exec pnpm --filter @fano/admin start
