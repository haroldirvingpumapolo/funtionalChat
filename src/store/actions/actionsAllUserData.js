import {
  ADD_CHAT_MESSAGE,
  CHAT_SELECTOR,
  ADD_NEW_USER,
  NEW_USER_LOGIN,
  CHANGE_USERNAME_BY_USER_ID,
  ADD_NEW_CHAT,
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

export const changeUsernameByUserId = (registeredUserId, newUsername) => ({
  type: CHANGE_USERNAME_BY_USER_ID,
  payload: { registeredUserId, newUsername }
})

export const addNewChat = (channelTypeValue, newChatValue) => ({
  type: ADD_NEW_CHAT,
  payload: { channelTypeValue, newChatValue }
})
