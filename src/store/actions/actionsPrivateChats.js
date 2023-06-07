import { ADD_PRIVATE_MESSAGE } from "../types/typesPrivateChats";

export const addPrivateMessage = (senderId, recipientId, text, date) => ({
  type: ADD_PRIVATE_MESSAGE,
  payload: {
    senderId,
    recipientId,
    text,
    date
  }
});