import { ADD_CHAT_MESSAGE } from '../types/types';
import {CHAT_SELECTOR} from '../types/types'
export const AddChatMessage = (username, chatName, message) => ({
  type: ADD_CHAT_MESSAGE,
  payload: { username, chatName, message },
});
export const chatSelector = (username, chatName, message) => ({
  type: CHAT_SELECTOR,
  payload: { username, chatName, message },
});
