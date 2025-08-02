# Installation

1. Install global dependencies:
`npm install -g pnpm`
`npm i tsx -g`

2. Download and install Node.js v20.18.3 [link](https://nodejs.org/en/download)

3. Download and install Docker Desktop [link](https://www.docker.com)

4. Create .env files:
- One in the project root
- One inside the `server/` folder
```
POSTGRES_USER="root"
POSTGRES_PASSWORD="password"
POSTGRES_DB="rage"
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
```
5. Start Docker containers:
`docker compose -f docker-compose.yml up -d`

6. Install project dependencies:
`pnpm install`

7. Run Prisma migrate and Enter a name for the new migration: init
`bunx prisma migrate dev`

# Build

`pnpm run build:all`

# Watch changes

`pnpm run watch`

# Startup

`pnpm run start`

