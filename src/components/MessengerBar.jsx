import { useSelector } from "react-redux";
import ShowChatName from "./ShowChatName";


function MessengerBar() {
  const { usuarios } = useSelector((state) => state.chatReducer);  
  const username = usuarios.find((users) => users.user === "delicious-damselfly");


  return (
    <div className="messengerBar-container container">
      <div className="myUser ">
        <div className="messengerBar-containe-information messengerBar_separator">
          <div>
            <h2>My User</h2>
            <p className="user">delicious-damselfly</p>
          </div>
          <img src="../../public/ajuste.png" alt="" />{" "}
        </div>
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="information">
        <div className="messengerBar-containe-information messengerBar_separator">
          <h2>Information</h2>
          <img src="../../public/agregar.png" alt="agregar" />
        </div>
        {username.information.channels.map(({ channelName }, key) => (
          <ShowChatName key={key} chatName={channelName}  />
        ))}
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="off-topic">
        <div className="messengerBar-containe-off-topic messengerBar_separator">
          <h2>Off-topic</h2>
          <img src="../../public/agregar.png" alt="agregar" />
        </div>
        {username.offTopic.channels.map(({ channelName }, key) => (
          <ShowChatName key={key} chatName={channelName} />
        ))}
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="otherUsers">
        <h2>Other Users</h2>
        {username.otherUsers.channels.map(({ chatUsers }, key) => (
          <p key={key} className="messengerBar-text" >
            {chatUsers}
          </p>
        ))}
      </div>
    </div>
  );
}

export default MessengerBar;
