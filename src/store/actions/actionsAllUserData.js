import {
  ADD_CHAT_MESSAGE,
  CHAT_SELECTOR,
  ADD_NEW_USER,
  NEW_USER_LOGIN,
} from "../types/typesAllUserData";

export const addChatMessage = (channelType, channelName, newUserIdWhoWrote, newMessageText, newMessageDate) => ({
  type: ADD_CHAT_MESSAGE,
  payload: { channelType, channelName, newUserIdWhoWrote, newMessageText, newMessageDate },
});

export const chatSelector = (channelTypeValue, channelNameValue) => ({
  type: CHAT_SELECTOR,
  payload: { channelTypeValue, channelNameValue },
});


export const addNewUser = (idUser, username) => ({
  type: ADD_NEW_USER,
  payload: { idUser, username },
});

export const newUserLogin = (userIdToRegister) => ({
  type: NEW_USER_LOGIN,
  payload: { userIdToRegister },
})
