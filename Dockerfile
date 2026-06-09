FROM node:22-slim AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@11.3.0

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files (needed for workspace-aware install)
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/
COPY packages/config/package.json ./packages/config/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY apps/web/package.json ./apps/web/

# Install dependencies — ignore-scripts bypasses pnpm@11 supply-chain policy
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy all source files
COPY . .

# Generate Prisma client (explicit — replaces the blocked postinstall)
RUN pnpm --filter @fano/db db:generate

# Build Next.js web app
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @fano/web build

# ---- Runner ----
FROM node:22-slim AS runner

WORKDIR /app

RUN npm install -g pnpm@11.3.0

COPY --from=builder /app ./

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["pnpm", "--filter", "@fano/web", "start"]
