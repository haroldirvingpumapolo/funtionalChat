import { ADD_CHAT_MESSAGE } from "../types/types";

export const addChatMessage = (username, message, newDate) => ({
  type: ADD_CHAT_MESSAGE,
  payload: { username, message, newDate },
});
