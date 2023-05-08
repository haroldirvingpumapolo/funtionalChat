function ChatBox() {
  return (
    <div className="chatBox">
      <div className="chatBox_title">
        <h1>Welcome</h1>
      </div>
      <div className="second_separator">
        <div className="second_separator-container"></div>
      </div>
      <div className="chatBox_chats"></div>
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
