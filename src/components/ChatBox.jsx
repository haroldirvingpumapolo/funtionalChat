import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/actions/actionsChannels";
import { addPrivateMessage } from "../store/actions/actionsPrivateChats";
import Message from "./Message";
import OnlyMessage from "./OnlyMessage";
import PropTypes from "prop-types";

function ChatBox({ registeredId, showUserOrChannelChatsWithId, isChannel }) {
  const { channels } = useSelector((state) => state.reducerChannels);
  const { usersData } = useSelector((state) => state.reducerUsers);
  const { privateChats } = useSelector((state) => state.reducerPrivateChats);
  const dispatch = useDispatch();
  const [chatTextValue, setChatTextValue] = useState("");
  const [broadcastChannel, setBroadcastChannel] = useState(null);
  const chatBoxChatsRef = useRef(null);
  const timestamp = new Date().getTime();

  useEffect(() => {
    const channel = new BroadcastChannel("addMessage");
    setBroadcastChannel(channel);

    channel.onmessage = (event) => {
      const {
        showUserOrChannelChatsWithId,
        registeredId,
        chatTextValue,
        timestamp,
        isChannel,
      } = event.data;
      dispatch(
        isChannel
          ? addMessage(
              showUserOrChannelChatsWithId,
              registeredId,
              chatTextValue,
              timestamp
            )
          : addPrivateMessage(
              showUserOrChannelChatsWithId,
              registeredId,
              chatTextValue,
              timestamp
            )
      );
      setTimeout(() => {
        chatBoxChatsRef.current.scrollTop =
          chatBoxChatsRef.current.scrollHeight;
      }, 10);
    };
    chatBoxChatsRef.current.scrollTop = chatBoxChatsRef.current.scrollHeight;
    return () => {
      channel.close();
    };
  }, [dispatch, isChannel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageArgs = [
      showUserOrChannelChatsWithId,
      registeredId,
      chatTextValue,
      timestamp,
      isChannel,
    ];

    dispatch(
      isChannel ? addMessage(...messageArgs) : addPrivateMessage(...messageArgs)
    );

    if (broadcastChannel) {
      const messageToSend = {
        showUserOrChannelChatsWithId,
        registeredId,
        chatTextValue,
        timestamp,
        isChannel,
      };
      broadcastChannel.postMessage(messageToSend);
    }
    setChatTextValue("");
    setTimeout(() => {
      chatBoxChatsRef.current.scrollTop = chatBoxChatsRef.current.scrollHeight;
    }, 10);
  };

  const arrMessages = isChannel
    ? channels.find((channel) => channel.id === showUserOrChannelChatsWithId)
        ?.messages || []
    : privateChats.find((privateChats) =>
        [registeredId, showUserOrChannelChatsWithId].every((idUser) =>
          privateChats.participants.includes(idUser)
        )
      )?.messages || [];
  let idPreviousUsername;

  return (
    <div className="chatBox">
      <div className="chatBox_title">
        <h1>
          {isChannel
            ? channels.find(
                (channel) => channel.id === showUserOrChannelChatsWithId
              ).name
            : usersData.find((user) => user.id === showUserOrChannelChatsWithId)
                .username}
        </h1>
      </div>
      <div className="second_separator">
        <div className="second_separator-container"></div>
      </div>
      <div className="chatBox_chats" ref={chatBoxChatsRef}>
        {arrMessages.length > 0 &&
          arrMessages.map(({ senderId, text, date }, key) => {
            const isFirstMessage = idPreviousUsername !== senderId;
            idPreviousUsername = senderId;
            const username = usersData.find(
              (user) => user.id === senderId
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
            <img
              src="../../images/enviar.png"
              alt="lupa"
              onClick={handleSubmit}
            />
          </label>
        </form>
      </div>
    </div>
  );
}
ChatBox.propTypes = {
  registeredId: PropTypes.number,
  showUserOrChannelChatsWithId: PropTypes.number,
  isChannel: PropTypes.bool,
};

export default ChatBox;
