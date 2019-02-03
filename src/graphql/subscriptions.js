// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateMessage = `subscription OnCreateMessage(
  $id: ID
  $text: String
  $create_date: AWSDateTime
) {
  onCreateMessage(id: $id, text: $text, create_date: $create_date) {
    id
    text
    create_date
  }
}
`;
export const onUpdateMessage = `subscription OnUpdateMessage(
  $id: ID
  $text: String
  $create_date: AWSDateTime
) {
  onUpdateMessage(id: $id, text: $text, create_date: $create_date) {
    id
    text
    create_date
  }
}
`;
export const onDeleteMessage = `subscription OnDeleteMessage(
  $id: ID
  $text: String
  $create_date: AWSDateTime
) {
  onDeleteMessage(id: $id, text: $text, create_date: $create_date) {
    id
    text
    create_date
  }
}
`;
