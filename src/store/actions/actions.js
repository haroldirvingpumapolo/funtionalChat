import { AGREGAR_MENSAJE_CHAT } from '../types/types';

export const agregarMensajeChat = (nombreUsuario, nombreChat, mensaje) => ({
  type: AGREGAR_MENSAJE_CHAT,
  payload: { nombreUsuario, nombreChat, mensaje },
});
