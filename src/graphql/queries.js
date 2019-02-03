// eslint-disable
// this is an auto generated file. This will be overwritten

export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    text
    create_date
  }
}
`;
export const listMessages = `query ListMessages(
  $filter: TableMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      create_date
    }
    nextToken
  }
}
`;
