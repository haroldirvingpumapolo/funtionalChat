import { AGREGAR_MENSAJE_CHAT } from "../types/types";

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
              fecha: "6/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              fecha: "8/5/23 9:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: "hola2",
              fecha: "6/5/23 5:20 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?2",
              fecha: "8/5/23 6:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: "hola3",
              fecha: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas3?",
              fecha: "8/5/23 5:14 PM",
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
              fecha: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              fecha: "8/5/23 5:14 PM",
            },
          ],
        },
        {
          channelName: "Readonly",
          chats: [
            {
              writtenBy: "delicious-damselfly",
              text: "hola",
              fecha: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              fecha: "8/5/23 5:14 PM",
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
              fecha: "8/5/23 5:14 PM",
            },
            {
              writtenBy: "delicious-damselfly",
              text: " como estas?",
              fecha: "8/5/23 5:14 PM",
            },
          ],
        },
      ],
    },
  },
];

const initialState = {
  usuarios: usuariosIniciales,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGREGAR_MENSAJE_CHAT:
      const { nombreUsuario, nombreChat, mensaje } = action.payload;
      const usuarioIndex = state.usuarios.findIndex(
        (usuario) => usuario.user === nombreUsuario
      );
      if (usuarioIndex === -1) {
        // Si el usuario no existe en el estado global, lo creamos
        return {
          ...state,
          usuarios: [
            ...state.usuarios,
            {
              nombreUsuario,
              chats: {
                [nombreChat]: mensaje,
              },
            },
          ],
        };
      } else {
        // Si el usuario ya existe en el estado global, actualizamos su mensaje en el chat correspondiente
        const usuarioActualizado = {
          ...state.usuarios[usuarioIndex],
          information: {
            ...state.usuarios[usuarioIndex].information,
            channels: state.usuarios[usuarioIndex].information.channels.map(
              (channel) => {
                if (channel.channelName === nombreChat) {
                  return {
                    ...channel,
                    chats: [...channel.chats, mensaje],
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
    default:
      return state;
  }
};
export default chatReducer;
