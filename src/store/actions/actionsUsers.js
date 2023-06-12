import { ADD_NEW_USER, CHANGE_USERNAME, } from "../types/typesUsers";

export const addNewUser = (newIdUser, newUsername) => ({
  type: ADD_NEW_USER,
  payload: { newIdUser, newUsername },
});

export const changeUsernameByUserId = (UserId, newUsername) => ({
  type: CHANGE_USERNAME,
  payload: { UserId, newUsername }
})