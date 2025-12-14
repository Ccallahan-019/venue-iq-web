import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { registerApolloClient } from '@apollo/client-integration-nextjs'
import { ErrorLink } from '@apollo/client/link/error'
import fetch from 'cross-fetch'

import { getPublicCmsUrl } from '../../env/web'

export function getApolloServerClient(token?: string) {
  const { getClient } = registerApolloClient(() => {
    const httpLink = new HttpLink({
      uri: `${getPublicCmsUrl()}/api/graphql`,
      fetch,
      headers: token ? { Authorization: `JWT ${token}` } : undefined,
    })

    const errorLink = new ErrorLink(({ error }) => {
      if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      } else if (CombinedProtocolErrors.is(error)) {
        error.errors.forEach(({ message, extensions }) =>
          console.log(
            `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`,
          ),
        )
      } else {
        console.error(`[Network error]: ${error}`)
      }
    })

    const link = ApolloLink.from([errorLink, httpLink])

    return new ApolloClient({
      cache: new InMemoryCache(),
      link,
      defaultOptions: {
        query: { errorPolicy: 'all' },
        watchQuery: { errorPolicy: 'all' },
      },
    })
  })

  return getClient()
}
