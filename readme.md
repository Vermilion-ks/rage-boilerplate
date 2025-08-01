# Installation

Install global dependencies:
`npm install -g pnpm`
`npm i tsx -g`

Download and install Node.js v20.18.3 [link](https://nodejs.org/en/download)

Download and install Docker Desktop [link](https://www.docker.com)

Rename the .env.example files to .env:
- One in the project root
- One inside the `server/` folder

Install project dependencies:
`pnpm install`

Start Docker containers:
`docker compose -f docker-compose.yml up -d`

# Build

`pnpm run build:all`

# Startup

`pnpm run start`

