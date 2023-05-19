import Message from "./message";
import { useDispatch, useSelector } from "react-redux";
import OnlyMessage from "./OnlyMessage";
import { useState } from "react";
import { addChatMessage } from "../store/actions/actionsAllUserData";

function ChatBox() {
  const { showSelectedChat, allUserData, registeredId } = useSelector(
    (state) => state.chatReducer
  );
  const username = allUserData.find(
    (users) => users.idUser === registeredId
  ).username;

  const [chatTextValue, setChatTextValue] = useState("");
  const dispatch = useDispatch();
  let previousWrittenBy;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addChatMessage(chatTextValue, new Date().getTime()));
    setChatTextValue("");
  };

  return (
    <div className="chatBox">
      <div className="chatBox_title">
        <h1>Welcome</h1>
      </div>
      <div className="second_separator">
        <div className="second_separator-container"></div>
      </div>
      <div className="chatBox_chats">
        {showSelectedChat.map(({ idUser, text, date }, key) => {
          const isFirstMessage = previousWrittenBy !== idUser;
          previousWrittenBy = idUser;
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
            <img src="../../public/enviar.png" alt="lupa" />
          </label>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
