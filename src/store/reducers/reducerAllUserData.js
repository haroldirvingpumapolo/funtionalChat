import {
  ADD_CHAT_MESSAGE,
  CHAT_SELECTOR,
  ADD_NEW_USER,
  NEW_USER_LOGIN,
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
              date: 1553578210000,
            },
          ],
        },
        {
          channelName: "Readonly",
          chats: [
            {
              idUser: "1616885640001",
              text: "hola",
              date: 1553572210777,
            },
            {
              idUser: "1616885640001",
              text: " como estas?",
              date: 1477967400444,
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
              date: 1553574267850,
            },
            {
              idUser: "1616885640001",
              text: " como estas?",
              date: 1477964530000,
            },
          ],
        },
        {
          channelName: "1616885640333",
          chats: [],
        },
      ],
    },
  },
  {
    idUser: "1616885640022",
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
      channels: [
        {
          channelName: "1616885640001",
          chats: [
            {
              idUser: "1616885640022",
              text: "hola soy segundo",
              date: 1477967404560,
            },
            {
              idUser: "1616885640022",
              text: " como estas soy segundo?",
              date: 1477967400000,
            },
          ],
        },
        {
          channelName: "1616885640333",
          chats: [],
        },
      ],
    },
  },
  {
    idUser: "1616885640333",
    username: "testUser3",
    information: {
      channels: [
        {
          channelName: "Welcome",
          chats: [],
        },
      ],
    },
    offTopic: {
      channels: [
        {
          channelName: "Chat4",
          chats: [],
        },
        {
          channelName: "Readonly",
          chats: [],
        },
      ],
    },
    otherUsers: {
      channels: [
        {
          channelName: "1616885640001",
          chats: [
            {
              idUser: "1616885640333",
              text: "hola soy tercero",
              date: 1477967400000,
            },
          ],
        },
        {
          channelName: "1616885640022",
          chats: [],
        },
      ],
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
      const { channelType, channelName, newUserIdWhoWrote, newMessageText, newMessageDate } = action.payload;

      const newMessage = {
        idUser: newUserIdWhoWrote,
        text: newMessageText,
        date: newMessageDate,
      };

      const updatedChatData = [...state.allUserData];
      updatedChatData.forEach((user) => {
        user[channelType].channels.forEach((channel) => {
          if (user.idUser === newUserIdWhoWrote && channel.channelName === channelName) {
            channel.chats.push(newMessage);
          }
        });
      });


      return {
        ...state,
        allUserData: updatedChatData.sort((a, b) => a.date - b.date),
      };
    }

    case CHAT_SELECTOR: {
      const { channelTypeValue, channelNameValue } = action.payload;


      return {
        ...state,
        channelTypeValue: channelTypeValue,
        channelNameValue: channelNameValue,
      };
    }
    case ADD_NEW_USER: {
      const { idUser, username } = action.payload;

      const addedUser = {
        channelName: idUser,
        chats: [],
      }

      const addedUsersForChats = state.allUserData.map((users) => ({ channelName: users.idUser, chats: [] }));

      const newUser = {
        idUser: idUser,
        username: username,
        information: {
          channels: [
            {
              channelName: "Welcome",
              chats: [],
            },
          ],
        },
        offTopic: {
          channels: [
            {
              channelName: "Chat4",
              chats: [],
            },
            {
              channelName: "Readonly",
              chats: [],
            },
          ],
        },
        otherUsers: { channels: addedUsersForChats },
      };

      const newAllUserDataWithAddedNewUser = state.allUserData.map((user) => ({
        ...user,
        otherUsers: {
          ...user.otherUsers,
          channels: [...user.otherUsers.channels, addedUser],
        }
      }));

      const updatedChatData = [...newAllUserDataWithAddedNewUser, newUser]


      return {
        ...state,
        allUserData: updatedChatData,
      };
    }
    case NEW_USER_LOGIN: {
      const { userIdToRegister } = action.payload
      return {
        ...state, registeredId: userIdToRegister,
      }
    }
    default:
      return state;
  }
};

export default chatReducer;
