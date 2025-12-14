'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'
import fetch from 'cross-fetch'

import { getPublicCmsUrl } from '../../../env/web'

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${getPublicCmsUrl()}/api/graphql`,
    fetch,
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
