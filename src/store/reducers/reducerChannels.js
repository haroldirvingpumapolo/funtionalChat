import { ADD_CHANNEL, ADD_MESSAGE } from "../types/typesChannels";

const initialState = {
  channels: [
    {
      id: 1616885654891,
      name: 'Welcome',
      idCategory: 1616885652491,
      messages: [
        {
          senderId: 1616885640001,
          text: " como estas?2",
          date: 1534203400000,
        },
        {
          senderId: 1616885640333,
          text: "hola3",
          date: 1643671560000,
        },
        {
          senderId: 1616885640022,
          text: " como estas3?",
          date: 1621148821000,
        },
      ]
    },
    {
      id: 1616885654891,
      name: 'Chat4',
      idCategory: 2616885694522,
      messages: [
        {
          senderId: 1616885640333,
          text: " como estas?2",
          date: 1534203400000,
        },
        {
          senderId: 1616885640001,
          text: "hola3",
          date: 1643671560000,
        },
        {
          senderId: 1616885640022,
          text: " como estas3?",
          date: 1621148821000,
        },
      ]
    },
    {
      id: 1616885654891,
      name: 'Reandonly',
      idCategory: 2616885694522,
      messages: [
        {
          senderId: 1616885640001,
          text: " como estas?2",
          date: 1534203400000,
        },
        {
          senderId: 1616885640022,
          text: "hola3",
          date: 1643671560000,
        },
        {
          senderId: 1616885640333,
          text: " como estas3?",
          date: 1621148821000,
        },
      ]
    },
  ]
}

const reducerChannels = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL: {
      const { channelId, channelName, idCategory } = action.payload;
      const newChannel = {
        id: channelId,
        name: channelName,
        idCategory: idCategory,
        messages: [],
      };
      return {
        ...state,
        channels: [...state.channels, newChannel],
      };
    }
    case ADD_MESSAGE: {
      const { channelId, senderId, text, date } = action.payload;
      const newMessage = {
        senderId: senderId,
        text: text,
        date: date,
      };
      const updatedChannels = [...state.channels]
      updatedChannels.forEach(channel => {
        channel.id === channelId && channel.messages.push(newMessage)
      });

      return {
        ...state,
        channels: updatedChannels,
      };
    }

    default:
      return state;
  }
};

export default reducerChannels;
