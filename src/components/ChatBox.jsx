import Message from "./message";
import { useSelector } from "react-redux";
import OnlyMessage from "./OnlyMessage";

function ChatBox() {
  const { showSelectedChat } = useSelector((state) => state.chatReducer);

  let previousWrittenBy = null;

  return (
    <div className="chatBox">
      <div className="chatBox_title">
        <h1>Welcome</h1>
      </div>
      <div className="second_separator">
        <div className="second_separator-container"></div>
      </div>
      <div className="chatBox_chats">
        {showSelectedChat.map(({ writtenBy, date, text }, key) => {
          const isFirstMessage = previousWrittenBy !== writtenBy;
          previousWrittenBy = writtenBy;
          return isFirstMessage ? (
            <Message key={key} writtenBy={writtenBy} date={date} text={text} />
          ) : (
            <OnlyMessage key={key} text={text} />
          );
        })}
      </div>
      <div className="chatBox_input_send-flex flex">
        <div className="chatBox_input_send-container ">
          <input type="text" value="" />
          <label>
            <img src="../../public/enviar.png" alt="lupa" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
