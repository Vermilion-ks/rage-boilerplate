# Installation

1. Install global dependencies:
`npm install -g pnpm`
`npm i tsx -g`

2. Download and install Node.js v20.18.3 [link](https://nodejs.org/en/download)

3. Download and install Docker Desktop [link](https://www.docker.com)

4. Rename end edit the `.env.example` file to `.env` in the project root:

5. Start Docker containers:
`docker compose -f docker-compose.yml up -d`

6. Install project dependencies:
`pnpm install`

7. Setup database
`pnpm run prisma:setup`

# Build

`pnpm run build:all`

# Startup

`pnpm run start`

