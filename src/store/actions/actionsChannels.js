import { ADD_CHANNEL, ADD_MESSAGE } from "../types/typesChannels";

export const addChannel = (channelId, channelName, idCategory) => ({
  type: ADD_CHANNEL,
  payload: { channelId, channelName, idCategory }
});

export const addMessage = (channelId, senderId, text, date) => ({
  type: ADD_MESSAGE,
  payload: { channelId, senderId, text, date }
});
