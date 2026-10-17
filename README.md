# SaaS starter

Next.js + GraphQL Yoga + Drizzle ORM + Neon Postgres, deployed on Netlify.

## Deploy (no coding needed)

1. Click the deploy button for this repo (see "For the maintainer" below).
2. When asked, connect a free [Neon](https://neon.com) database and add its
   connection string as `DATABASE_URL`.
3. Open your new site. The home page tells you if anything is missing.

Tables are created automatically on every deploy.

## Local development

    npm install
    cp .env.example .env.local   # paste your connection string
    npm run db:migrate
    npm run dev

GraphQL endpoint: `/api/graphql`

## Changing the database

1. Edit `src/db/schema.ts`
2. `npm run db:generate` (creates a migration in `drizzle/`)
3. Commit and push. The next deploy applies it.

## For the maintainer

Deploy button, once the repo is public on GitHub:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/taylorgoolsby/saas-starter)
