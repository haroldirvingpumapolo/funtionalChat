import { ADD_PRIVATE_MESSAGE } from "../types/typesPrivateChats";

export const addPrivateMessage = (recipientId, senderId, text, date) => ({
  type: ADD_PRIVATE_MESSAGE,
  payload: {
    recipientId,
    senderId,
    text,
    date
  }
});