import { useSelector, useDispatch } from "react-redux";
import ShowChatName from "./ShowChatName";
import { chatSelector } from "../store/actions/actionsAllUserData";
import { useState } from "react";
import ModalComponent from "./Modal";

function MessengerBar() {
  const { allUserData, registeredId } = useSelector(
    (state) => state.chatReducer
  );
  const sessionIdOf = allUserData.find(
    (users) => users.idUser === registeredId
  );
  const username = sessionIdOf.username;
  const dispatch = useDispatch();

  const [modals, setModals] = useState({
    changeUsername: false,
    newInformationChat: false,
    newOffTopicChat: false,
  });

  const openModal = (modalName) => {
    setModals({
      ...modals,
      [modalName]: true,
    });
  };

  const closeModal = (modalName) => {
    setModals({
      ...modals,
      [modalName]: false,
    });
  };
  

  return (
    <div className="messengerBar-container container">
      <div className="myUser ">
        <div className="messengerBar-containe-information messengerBar_separator">
          <div>
            <h2>My User</h2>
            <p className="user">{username}</p>
          </div>
          <img
            onClick={() => openModal("changeUsername")}
            src="../../images/ajuste.png"
            alt=""
          />
          <ModalComponent
            modalFor={"changeUsernameByUserId"}
            registeredId={registeredId}
            username={username}
            isOpen={modals.changeUsername}
            closeModal={() => closeModal("changeUsername")}
            title={"Settings"}
            inputLabel={"Nickname"}
          />
        </div>
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="information">
        <div className="messengerBar-containe-information messengerBar_separator">
          <h2>Information</h2>
          <img
            onClick={() => openModal("newInformationChat")}
            src="../../images/agregar.png"
            alt="agregar"
          />
          <ModalComponent
            modalFor={"addNewChat"}
            registeredId={registeredId}
            isOpen={modals.newInformationChat}
            closeModal={() => closeModal("newInformationChat")}
            title={"Create Group Chat"}
            chatType={"in information"}
            inputLabel={"Chat Name"}
            channelTypeValue={"information"}
          />
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
          <img
            onClick={() => openModal("newOffTopicChat")}
            src="../../images/agregar.png"
            alt="agregar"
          />
          <ModalComponent
            modalFor={"addNewChat"}
            registeredId={registeredId}
            isOpen={modals.newOffTopicChat}
            closeModal={() => closeModal("newOffTopicChat")}
            title={"Create Group Chat"}
            chatType={"in Off-topic"}
            inputLabel={"Chat Name"}
            channelTypeValue={"offTopic"}
          />
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
          const username = allUserData.find(
            (user) => user.idUser === channelName
          ).username;

          return (
            <p
              key={key}
              className="container-text"
              onClick={() => dispatch(chatSelector("otherUsers", channelName))}
            >
              {username}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default MessengerBar;
