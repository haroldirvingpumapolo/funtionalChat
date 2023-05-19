import {
  ADD_CHAT_MESSAGE,
  CHAT_SELECTOR,
} from "../types/typesAllUserData";

const initialUserData = [
  {
    idUser: "1616885640001",
    username: "testUser1",
    information: {
      channels: [
        {
          channelName: "Welcome",
          chats: [
            {
              idUser: "1616885640001",
              text: "hola",
              date: 1616885640000,
            },
            {
              idUser: "1616885640001",
              text: " como estas?",
              date: 1572611080000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: "hola2",
              date: 1589755320000,
            },
            {
              idUser: "1616885640001",
              text: " como estas?2",
              date: 1534203400000,
            },
            {
              idUser: "1616885640001",
              text: "hola3",
              date: 1643671560000,
            },
            {
              idUser: "1616885640001",
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
              idUser: "1616885640001",
              text: "hola",
              date: 1553572210000,
            },
            {
              idUser: "1616885640001",
              text: " como estas?",
              date: 1553572210000,
            },
          ],
        },
        {
          channelName: "Readonly",
          chats: [
            {
              idUser: "1616885640001",
              text: "hola",
              date: 1553572210000,
            },
            {
              idUser: "1616885640001",
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
          channelName: "1616885640022",
          chats: [
            {
              idUser: "1616885640001",
              text: "hola",
              date: 1553572210000,
            },
            {
              idUser: "1616885640001",
              text: " como estas?",
              date: 1477967400000,
            },
          ],
        },
      ],
    },
  },
  {
    user: "1616885640022",
    username: "testUser2",
    information: {
      channels: [
        {
          channelName: "Welcome",
          chats: [
            {
              idUser: "1616885640022",
              text: "hola",
              date: 1618740523000,
            },
            {
              idUser: "1616885640022",
              text: " como estas?",
              date: 1631037482000,
            },
            {
              idUser: "1616885640022",
              text: "hola2",
              date: 1654320000000,
            },
            {
              idUser: "1616885640022",
              text: " como estas?2",
              date: 1532566400000,
            },
            {
              idUser: "1616885640022",
              text: "hola3",
              date: 1583209600000,
            },
            {
              idUser: "1616885640022",
              text: " como estas3?",
              date: 1227660800000,
            },
          ],
        },
      ],
    },
    offTopic: {
      channels: [],
    },
    otherUsers: {
      channels: [{ chanelName: "1616885640001", chats: [{
        idUser: "1616885640022",
        text: " como estas3?",
        date: 1227660800000,
      },] }],
    },
  },
];

const initialState = {
  allUserData: initialUserData,
  showSelectedChat: initialUserData
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
  registeredId: "1616885640001",
  channelTypeValue: "information",
  channelNameValue: "Welcome",
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_MESSAGE: {
      const { newMessageText, newMessageDate } = action.payload;
      const newMessage = {
        idUser: state.registeredId,
        text: newMessageText,
        date: newMessageDate,
      };

      const updatedChatData = state.allUserData.map((users) =>
        users.idUser !== state.registeredId
          ? users
          : {
              ...users,
              [state.channelTypeValue]: {
                ...users[state.channelTypeValue],
                channels: users[state.channelTypeValue].channels.map(
                  (channel) =>
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
      const showSelectedChatNew = updatedChatData
        .flatMap(
          (user) =>
            user[state.channelTypeValue].channels.find(
              (channel) => channel.channelName === state.channelNameValue
            )?.chats || []
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
        allUserData: updatedChatData,
        showSelectedChat: showSelectedChatNew,
      };
    }

    case CHAT_SELECTOR: {
      const { channelTypeValue, channelNameValue } = action.payload;

      const showSelectedChatNew = state.allUserData
        .flatMap(
          (user) =>
            user[channelTypeValue].channels.find(
              (channel) => channel.channelName === channelNameValue
            )?.chats || []
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
        showSelectedChat: showSelectedChatNew,
        channelTypeValue: channelTypeValue,
        channelNameValue: channelNameValue,
      };
    }

    

    default:
      return state;
  }
};

export default chatReducer;
