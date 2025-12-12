# Venue IQ – Database & Migrations

## Overview

- **DB**: Neon Postgres (managed via Vercel integration)
- **Adapter**: `@payloadcms/db-vercel-postgres`
- **Owner**: Venue IQ

Payload is the *only* thing responsible for DB schema changes.
No direct manual schema edits in Postgres.

---

## Environments

We use separate Neon branches per environment:

- **Local**: `venue-iq-dev`
  - URL in `.env.local` → `POSTGRES_URL`
- **Staging**: `venue-iq-stage`
  - Used by Vercel “Preview” deployments
- **Production**: `venue-iq-prod`
  - Used by Vercel “Production” deployments

### Required env vars (CMS)

| Name                     | Scope        | Description                             |
| ------------------------ | ------------ | --------------------------------------- |
| `POSTGRES_URL`           | All          | Neon/Vercel Postgres connection string  |
| `PAYLOAD_SECRET`         | All          | Secret for Payload auth / sessions      |
| `NEXT_PUBLIC_SERVER_URL` | All          | Public URL                              |
| `NODE_ENV`               | All          | `development` / `production`            |

See `.env.example` for the full list.

---

## Schema & naming conventions

### Collections → Tables

Payload collections map to Postgres tables in snake_case:

- `users` collection → `users` table
- `media` collection → `media` table

**Conventions:**

- Collection slugs use **kebab-case** in code.
- Tables are automatically **snake_case**; don’t rename them manually.
- Foreign keys/relations are defined in Payload config, not raw SQL.

### Field naming

- Use **camelCase** in Payload fields.
- Let Payload’s adapter handle column naming; don’t rename columns directly in Postgres.

---

## Migrations

We use Payload’s built-in migration system.

### Commands (run from root directory)

- Generate: `npm migrate:generate <name>`
- Apply up: `npm migrate`
- Apply down (undo last): `pnpm migrate:down`

### Workflow

1. Update Payload config (collections/globals).
2. Run `npm migrate:generate descriptive-name`.
3. Review the generated file in `src/migrations/`.
4. Run `npm migrate` against:
   - Staging (via CI / Preview env)
   - Prod (via CI / Production env)

> Every schema change must have a matching migration file checked into git.

---

## Rules of engagement

- OK:
  - Adding/changing fields via Payload and generating a migration
  - Writing custom SQL inside a migration file **if needed**
  - Using Neon branches for experimental feature work

- Not OK:
  - Creating/dropping tables directly in Postgres
  - Renaming columns in Postgres outside of a migration
  - Pointing two different environments at the same DB
