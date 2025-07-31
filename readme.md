# Installation

Run `bun install`

Run `docker compose -f docker-compose.dev.yml up -d`

Run `bun run prisma:generate` and `bun run prisma:apply:migrations`

# Startup

Build project: `bun run build:all`

To start a project: `bun run watch` and `bun run dev-binary`
