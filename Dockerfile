FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@11.3.0

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files (needed for pnpm install)
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/
COPY packages/config/package.json ./packages/config/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY apps/web/package.json ./apps/web/

# Install all dependencies (--ignore-scripts bypasses pnpm@11 supply-chain policy;
# Prisma is generated separately below, Sharp uses prebuilt binaries)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy all source files
COPY . .

# Generate Prisma client
RUN pnpm --filter @fano/db db:generate

# Build web app
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @fano/web build

# ---- Runner ----
FROM node:22-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm@11.3.0

# Copy everything from builder
COPY --from=builder /app ./

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["pnpm", "--filter", "@fano/web", "start"]
