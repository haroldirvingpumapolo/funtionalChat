import { ADD_PRIVATE_MESSAGE } from "../types/typesPrivateChats";

const initialState = {
  privateChats: [
    {
      participants: [1616885640001, 1616885640022],
      messages: [
        { senderId: 1616885640001, text: "Hola, ¿cómo estás?", date: 1685512368006 },
        { senderId: 1616885640022, text: "Bien, gracias. ¿Y tú?", date: 1685594568800 },
        { senderId: 1616885640001, text: "¿Quieres salir este fin de semana?", date: 1685592653800 }
      ]
    },
  ]
};
/* new Date().getTime() */
const reducerPrivateChats = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRIVATE_MESSAGE: {
      const { senderId, recipientId, text, date } = action.payload;

      const updatedPrivateChats = [...state.privateChats];
      updatedPrivateChats.forEach(privateChat => {
        (privateChat.participants.includes(senderId) && privateChat.participants.includes(recipientId)) ? (
          privateChat.messages.push({ senderId: senderId, text: text, date: date })) : updatedPrivateChats.push({
            participants: [senderId, recipientId],
            messages: [
              { senderId: senderId, text: text, date: date }
            ]
          })

      });

      return {
        ...state,
        privateChats: updatedPrivateChats
      };
    }
    default:
      return state;
  }
};

export default reducerPrivateChats;
