import { gql } from '@apollo/client'

export const GET_HOME_PAGE = gql`
  query Pages {
    Pages(where: { title: { equals: "Home" } }, limit: 1, draft: false, pagination: false) {
      docs {
        id
        title
      }
    }
  }
`
