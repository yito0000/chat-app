// eslint-disable
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag'

export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    username
    text
    createDate
  }
}
`;
export const listMessages = gql`query ListMessages(
  $filter: TableMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      text
      createDate
    }
    nextToken
  }
}
`;
