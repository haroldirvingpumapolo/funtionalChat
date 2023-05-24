import { useSelector } from "react-redux";
import ShowChatName from "./ShowChatName";
import { chatSelector } from "../store/actions/actionsAllUserData";
import { useDispatch } from "react-redux";

function MessengerBar() {
  const { allUserData, registeredId } = useSelector(
    (state) => state.chatReducer
  );
  const sessionIdOf = allUserData.find(
    (users) => users.idUser === registeredId
  );
  const username = sessionIdOf.username;

  const dispatch = useDispatch();

  return (
    <div className="messengerBar-container container">
      <div className="myUser ">
        <div className="messengerBar-containe-information messengerBar_separator">
          <div>
            <h2>My User</h2>
            <p className="user">{username}</p>
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
        {sessionIdOf.information.channels.map(({ channelName }, key) => (
          <ShowChatName
            key={key}
            channelType={"information"}
            chatName={channelName}
          />
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
        {sessionIdOf.offTopic.channels.map(({ channelName }, key) => (
          <ShowChatName
            key={key}
            channelType={"offTopic"}
            chatName={channelName}
          />
        ))}
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="otherUsers">
        <h2>Other Users</h2>
        {sessionIdOf.otherUsers.channels.map(({ channelName }, key) => {
          const sentBy = allUserData.find(
            (user) => user.idUser === channelName
          ).username;
          
          return(
          <p
            key={key}
            className="container-text"
            onClick={() => dispatch(chatSelector("otherUsers", channelName))}
          >
            {sentBy}
          </p>)
        })}
      </div>
    </div>
  );
}

export default MessengerBar;
