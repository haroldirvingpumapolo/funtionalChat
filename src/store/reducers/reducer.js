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
              date: "6/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: "8/5/23 9:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: "hola2",
              date: "6/5/23 5:20 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?2",
              date: "8/5/23 6:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: "hola3",
              date: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas3?",
              date: "8/5/23 5:14 PM",
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
              date: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: "8/5/23 5:14 PM",
            },
          ],
        },
        {
          channelName: "Readonly",
          chats: [
            {
              writtenBy: "delicious-damselfly",
              text: "hola",
              date: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: "8/5/23 5:14 PM",
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
              date: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              date: "8/5/23 5:14 PM",
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
              date: "6/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-2",
              text: " como estas?",
              date: "8/5/23 9:14 PM",
            },
            {
              writtenBy: "delicious-2",
              text: "hola2",
              date: "6/5/23 5:20 PM",
            },
            {
              writtenBy: "delicious-2",
              text: " como estas?2",
              date: "8/5/23 6:14 PM",
            },
            {
              writtenBy: "delicious-2",
              text: "hola3",
              date: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-2",
              text: " como estas3?",
              date: "8/5/23 5:14 PM",
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
    .sort((a, b) => new Date(a.date) - new Date(b.date)),
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_MESSAGE:
      const { username, chatName, message } = action.payload;
      const usuarioIndex = state.usuarios.findIndex(
        (usuario) => usuario.user === username
      );
      if (usuarioIndex === -1) {
        // Si el usuario no existe en el estado global, lo creamos
        return {
          ...state,
          usuarios: [
            ...state.usuarios,
            {
              username,
              chats: {
                [chatName]: message,
              },
            },
          ],
        };
      } else {
        // Si el usuario ya existe en el estado global, actualizamos su message en el chat correspondiente
        const usuarioActualizado = {
          ...state.usuarios[usuarioIndex],
          information: {
            ...state.usuarios[usuarioIndex].information,
            channels: state.usuarios[usuarioIndex].information.channels.map(
              (channel) => {
                if (channel.channelName === chatName) {
                  return {
                    ...channel,
                    chats: [...channel.chats, message],
                  };
                }
                return channel;
              }
            ),
          },
        };
        const usuariosActualizados = [
          ...state.usuarios.slice(0, usuarioIndex),
          usuarioActualizado,
          ...state.usuarios.slice(usuarioIndex + 1),
        ];
        return {
          ...state,
          usuarios: usuariosActualizados,
        };
      }

    // case CHAT_SELECTOR:
    //   const newValueSelector = state.usuarios
    //     .find((users) => users.user === "delicious-damselfly")
    //     .information.channels.find(
    //       (channel) => channel.channelName === "Welcome"
    //     )
    //     .chats.sort((a, b) => new Date(a.date) - new Date(b.date));
    //   return { ...state, showSelectedChat: newValueSelector };

    default:
      return state;
  }
};
export default chatReducer;
