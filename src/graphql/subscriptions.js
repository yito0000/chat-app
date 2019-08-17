// eslint-disable
// this is an auto generated file. This will be overwritten
// import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'

//export const onCreateMessage = async () => {
//  const subscription = `subscription OnCreateMessage(
//    $id: ID
//    $text: String
//    $create_date: AWSDateTime
//  ) {
//    onCreateMessage(id: $id, text: $text, create_date: $create_date) {
//      id
//      text
//      create_date
//    }
//  }
//  `
//  const subscriber = await API.graphql(
//    graphqlOperation(subscription)
//   ).subscribe({
//     next: (data) => {
//       console.log(data)
//     },
//     error: (error) => {
//       console.error(error)
//     },
//   })
//  return subscriber
//};

export const onCreateMessage = gql`subscription OnCreateMessage {
  onCreateMessage {
    id
    text
    username
    createDate
  }
}
`;
export const onUpdateMessage = `subscription OnUpdateMessage(
  $id: ID
  $text: String
  $createDate: AWSDateTime
) {
  onUpdateMessage(id: $id, text: $text, createDate: $createDate) {
    id
    text
    username
    createDate
  }
}
`;
export const onDeleteMessage = `subscription OnDeleteMessage(
  $id: ID
  $text: String
  $createDate: AWSDateTime
) {
  onDeleteMessage(id: $id, text: $text, createDate: $createDate) {
    id
    text
    username
    createDate
  }
}
`;
