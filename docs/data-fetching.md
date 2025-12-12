# Data Fetching Strategy

## Server-Side Data Fetching (Payload Local API)

- For **server-side rendering** and API routes, we primarily use Payload's local API to fetch data.

## Client-Side Data Fetching (Apollo Client + Payload GraphQL API)

- For **client-side rendering**, we use the Apollo Client Next JS Integration library alongside Payload's GraphQL API. This is accomplished through the use of a client provider, found in `src/lib/graphql/ApolloClientProvider.tsx`.
