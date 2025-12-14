# Venue IQ Monorepo

This repository contains the core codebase for Venue IQ, a web-based SaaS platform focused on transforming fragmented venue concessions data into real-time, actionable insights.

The repo is structured as a monorepo with multiple deployable applications and shared internal packages, designed to support independent deployments, shared UI and logic, and clean separation of concerns.

## High-Level Overview

Venue IQ is split into two primary applications:

**Web App** – the public-facing application and primary user interface

**CMS** – a Payload-powered content and data management system running inside Next.js

These applications are deployed independently (e.g. as separate Vercel projects) and communicate over HTTP. Shared UI components, utilities, and types live in internal workspace packages.

Because the web app does not have direct access to Payload’s local API, all data access happens over GraphQL using Apollo Client, including server-side data fetching.

## Repository Structure

```txt
apps/
  web/                # Next.js web application
  cms/                # Next.js app running Payload CMS

packages/
  ui/                 # Shared UI components (Radix-based)
  shared/              # Shared utilities, types, env helpers, GraphQL helpers

.eslintrc / eslint.config.mjs
turbo.json
tsconfig.json
package.json
```

`apps/web`

- Next.js App Router
- Uses Apollo Client for GraphQL data fetching
- Consumes CMS data via Payload's GraphQL endpoint
- Imports shared UI and utilities from `packages/`

`apps/cms`

- Next.js app running Payload CMS
- Owns:
  - Payload config
  - collections
  - access rules
  - admin UI
- Exposes REST + GraphQL APIs for the web app
- Handles authentication, email, and database access

`packages/ui`

- Shared design system and UI components
- Built on Radix Themes & Primitives
- Framework-agnostic (no Next.js assumptions)
- React is treated as a peer dependency

`packages/shared`

- Shared, non-UI logic:
  - environment variable validation (Zod)
  - helpers and utilities
  - shared types
  - GraphQL helpers/fragments
- Explicit subpath exports for env modules:
  - `@venue-iq/shared/env/web`
  - `@venue-iq/shared/env/cms`

`packages/cms-types`

- ingests Payload types when types are generated from `npm run generate:types`
- makes CMS types available across both the CMS and application

## Tech Stack

### Core

- Next.js (App Router)
- TypeScript
- Payload CMS (running inside Next.js)
- PostgreSQL

### Data & Networking

- GraphQL
- Apollo Client
  - Used in the web app for both server-side and client-side data fetching
  - Required due to CMS being deployed as a separate service

### UI & Styling

- Radix Themes & Primitives
- PostCSS
- (Tailwind optional / app-specific if enabled)

### Tooling

- Turborepo – task orchestration and caching
- npm workspaces – dependency management
- ESLint (flat config) – shared linting across apps and packages
- Zod – environment variable validation

### Hosting / CI

- Vercel
  - One project per app (`apps/web`, `apps/cms`)
  - Preview deployments for feature branches
  - Production deployments from `main`
