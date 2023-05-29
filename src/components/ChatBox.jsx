import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../store/actions/actionsAllUserData";
import Message from "./Message";
import OnlyMessage from "./OnlyMessage";

function ChatBox() {
  const [chatTextValue, setChatTextValue] = useState("");
  const dispatch = useDispatch();
  const { channelTypeValue, channelNameValue, registeredId, allUserData } =
    useSelector((state) => state.chatReducer);
  const [broadcastChannel, setBroadcastChannel] = useState(null);
  const chatBoxChatsRef = useRef(null);
  const timestamp = new Date().getTime();

  useEffect(() => {
    const channel = new BroadcastChannel("addChatMessage");
    setBroadcastChannel(channel);

    channel.onmessage = (event) => {
      const {
        channelTypeValue,
        channelNameValue,
        registeredId,
        chatTextValue,
        timestamp,
      } = event.data;
      dispatch(
        addChatMessage(
          channelTypeValue,
          channelNameValue,
          registeredId,
          chatTextValue,
          timestamp
        )
      );
      setTimeout(() => {
        chatBoxChatsRef.current.scrollTop = chatBoxChatsRef.current.scrollHeight;
      }, 10);
    };
    chatBoxChatsRef.current.scrollTop = chatBoxChatsRef.current.scrollHeight;
    return () => {
      channel.close();
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addChatMessage(
        channelTypeValue,
        channelNameValue,
        registeredId,
        chatTextValue,
        timestamp
      )
    );
    if (broadcastChannel) {
      const messageToSend = {
        channelTypeValue,
        channelNameValue,
        registeredId,
        chatTextValue,
        timestamp,
      };
      broadcastChannel.postMessage(messageToSend);
    }
    setChatTextValue("");
    setTimeout(() => {
      chatBoxChatsRef.current.scrollTop = chatBoxChatsRef.current.scrollHeight;
    }, 10);
  };

  const getFormattedChat = (chat) => {
    const convertedDateFormat = new Date(chat.date)
      .toLocaleString("es", {
        dateStyle: "short",
        timeStyle: "short",
      })
      .replace(",", "");
    return { ...chat, date: convertedDateFormat };
  };

  let showSelectedChatNew = allUserData.flatMap(
    (user) =>
      user[channelTypeValue].channels.find(
        (channel) => channel.channelName === channelNameValue
      )?.chats || []
  );

  if (channelTypeValue === "otherUsers") {
    const showSelectedChatUser1 =
      allUserData
        .find((users) => users.idUser === registeredId)[channelTypeValue].channels.find(
          (channel) => channel.channelName === channelNameValue
        )?.chats || [];
    const showSelectedChatUser2 =
      allUserData
        .find((users) => users.idUser === channelNameValue)[channelTypeValue].channels.find(
          (channel) => channel.channelName === registeredId
        )?.chats || [];
    showSelectedChatNew = [...showSelectedChatUser1, ...showSelectedChatUser2];
  }
  let idPreviousUsername;

  return (
    <div className="chatBox">
      <div className="chatBox_title">
        <h1>
          {isNaN(channelNameValue)
            ? channelNameValue
            : allUserData.find((user) => user.idUser === channelNameValue)
                .username}
        </h1>
      </div>
      <div className="second_separator">
        <div className="second_separator-container"></div>
      </div>
      <div className="chatBox_chats" ref={chatBoxChatsRef}>
        {showSelectedChatNew
          .sort((a, b) => a.date - b.date)
          .map(getFormattedChat)
          .map(({ idUser, text, date }, key) => {
            const isFirstMessage = idPreviousUsername !== idUser;
            idPreviousUsername = idUser;
            const username = allUserData.find(
              (user) => user.idUser === idUser
            ).username;
            return isFirstMessage ? (
              <Message key={key} username={username} text={text} date={date} />
            ) : (
              <OnlyMessage key={key} text={text} />
            );
          })}
      </div>
      <div className="chatBox_input_send-flex flex">
        <form onSubmit={handleSubmit} className="chatBox_input_send-container ">
          <input
            type="text"
            value={chatTextValue}
            onChange={(e) => setChatTextValue(e.target.value)}
          />
          <label>
            <img src="../../images/enviar.png" alt="lupa" onClick={handleSubmit} />
          </label>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
