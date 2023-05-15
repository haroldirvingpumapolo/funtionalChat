import { ADD_CHAT_MESSAGE } from "../types/types";
import { CHAT_SELECTOR } from "../types/types";

const usuariosIniciales = [
  {
    user: "delicious-damselfly",
    information: {
      channels: [
        {
          channelName: "Welcome",
          chats: [
            {
              writtenBy: "delicious-damselfly",
              text: "hola",
              date: 1616885640000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: 1572611080000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: "hola2",
              date: 1589755320000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?2",
              date: 1534203400000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: "hola3",
              date: 1643671560000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas3?",
              date: 1621148821000,
            },
          ],
        },
      ],
    },
    offTopic: {
      channels: [
        {
          channelName: "Chat4",
          chats: [
            {
              writtenBy: "delicious-damselfly",
              text: "hola",
              date: 1553572210000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: 1553572210000,
            },
          ],
        },
        {
          channelName: "Readonly",
          chats: [
            {
              writtenBy: "delicious-damselfly",
              text: "hola",
              date: 1553572210000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: 1477967400000,
            },
          ],
        },
      ],
    },
    otherUsers: {
      channels: [
        {
          chatUsers: `delicious-damselfly/User2`,
          chats: [
            {
              writtenBy: "delicious-damselfly",
              text: "hola",
              date: 1553572210000,
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: 1477967400000,
            },
          ],
        },
      ],
    },
  },
  {
    user: "delicious-2",
    information: {
      channels: [
        {
          channelName: "Welcome",
          chats: [
            {
              writtenBy: "delicious-2",
              text: "hola",
              date: 1618740523000,
            },
            {
              writtenBy: "delicious-2",
              text: " como estas?", //asdf
              date: 1631037482000,
            },
            {
              writtenBy: "delicious-2",
              text: "hola2",
              date: 1654320000000,
            },
            {
              writtenBy: "delicious-2",
              text: " como estas?2",
              date: 1532566400000,
            },
            {
              writtenBy: "delicious-2",
              text: "hola3",
              date: 1583209600000,
            },
            {
              writtenBy: "delicious-2",
              text: " como estas3?",
              date: 1227660800000,
            },
          ],
        },
      ],
    },
  },
];

const initialState = {
  usuarios: usuariosIniciales,
  showSelectedChat: usuariosIniciales
    .flatMap(
      (user) =>
        user.information.channels.find(
          (channel) => channel.channelName === "Welcome"
        ).chats
    )
    .sort((a, b) => a.date - b.date)
    .map((chat) => {
      const convertedDateFormat = new Date(chat.date)
        .toLocaleString("es", {
          dateStyle: "short",
          timeStyle: "short",
        })
        .replace(",", "");
      return {
        ...chat,
        date: convertedDateFormat,
      };
    }),
  channelTypeValue: "information",
  channelNameValue:'Welcome'
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_MESSAGE: {
      const {username, message, newDate } = action.payload;
      const newMessage = {
        writtenBy: username,
        text: message,
        date: newDate,
      };
      const usuariosNew = state.usuarios.map((users) =>
        users.user !== username
          ? users
          : {
              ...users,
              [state.channelTypeValue]: {
                ...users[state.channelTypeValue],
                channels: users[state.channelTypeValue].channels.map((channel) =>
                  channel.channelName !== state.channelNameValue
                    ? channel
                    : {
                        ...channel,
                        chats: [...channel.chats, newMessage],
                      }
                ),
              },
            }
      );
      const showSelectedChatNew = usuariosNew
        .flatMap(
          (user) =>
            user[state.channelTypeValue].channels.find(
              (channel) => channel.channelName === "Welcome"
            ).chats
        )
        .sort((a, b) => a.date - b.date)
        .map((chat) => {
          const convertedDateFormat = new Date(chat.date)
            .toLocaleString("es", {
              dateStyle: "short",
              timeStyle: "short",
            })
            .replace(",", "");
          return { ...chat, date: convertedDateFormat };
        });
      return {
        ...state,
        usuarios: usuariosNew,
        showSelectedChat: showSelectedChatNew,
      };
    }
   
    default:
      return state;
  }
};

export default chatReducer;
