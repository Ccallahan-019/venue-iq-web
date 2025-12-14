import type { Page } from '@venue-iq/cms-types'
import { GET_HOME_PAGE, getApolloServerClient, hasItems } from '@venue-iq/shared'

export default async function Home() {
  const client = getApolloServerClient()

  const { data } = await client.query<{
    Pages: { docs: Page[] }
  }>({
    query: GET_HOME_PAGE,
  })

  console.log(data)

  const homePage = data && hasItems(data.Pages.docs) ? data.Pages.docs[0] : undefined

  return <div>{homePage && homePage.title ? homePage.title : 'Venue IQ'}</div>
}
