import {
  ADD_CHAT_MESSAGE,
  CHAT_SELECTOR,
} from "../types/typesAllUserData";

export const addChatMessage = (newMessageText, newMessageDate) => ({
  type: ADD_CHAT_MESSAGE,
  payload: { newMessageText, newMessageDate },
});

export const chatSelector = (channelTypeValue, channelNameValue) => ({
  type: CHAT_SELECTOR,
  payload: { channelTypeValue, channelNameValue },
});


