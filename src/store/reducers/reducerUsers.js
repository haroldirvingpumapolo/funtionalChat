import { ADD_NEW_USER } from "../types/typesAllUserData";
import { CHANGE_USERNAME } from "../types/typesUsers";

const initialUserData = {
  usersData: [
    { id: 1616885640001, username: 'testUser1' },
    { id: 1616885640022, username: 'testUser2' },
    { id: 1616885640333, username: 'testUser3' },
  ]
}

const reducerUsers = (state = initialUserData, action) => {
  switch (action.type) {
    case ADD_NEW_USER: {
      const { newIdUser, newUsername } = action.payload;
      return {
        ...state,
        usersData: [...state.usersData, { id: newIdUser, username: newUsername }]
      };
    }
    case CHANGE_USERNAME: {
      const { UserId, newUsername } = action.payload;

      const updatedUserData = [...state.usersData];
      updatedUserData.forEach((user) => user.id === UserId && (user.username = newUsername));

      return {
        ...state,
        usersData: updatedUserData,
      };
    }
    default:
      return state;
  }
};
export default reducerUsers;