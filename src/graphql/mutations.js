// eslint-disable
// this is an auto generated file. This will be overwritten
import { API, graphqlOperation } from 'aws-amplify'

export const createMessage = async (data) => {
  const create = `mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      text
      username
      createDate
    }
  }
  `
  const messageDetails = {
    input: {
      username: data.username,
      text: data.text
    }
  }
  const newMessage = await API.graphql(graphqlOperation(create, messageDetails))
  console.log(newMessage)
  return newMessage

};
//`mutation CreateMessage($input: CreateMessageInput!) {
//  createMessage(input: $input) {
//    id
//    text
//    create_date
//  }
//}
//`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    text
    createDate
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    text
    createDate
  }
}
`;
