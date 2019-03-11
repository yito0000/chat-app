// eslint-disable
// this is an auto generated file. This will be overwritten
import { API, graphqlOperation } from 'aws-amplify'

export const createMessage = async (data) => {
  const create = `mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      user_id
      text
      create_date
    }
  }
  `
  const messageDetails = {
    input: {
      user_id: data.username,
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
    create_date
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    text
    create_date
  }
}
`;
