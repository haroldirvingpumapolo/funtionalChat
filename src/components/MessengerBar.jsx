import { useSelector } from "react-redux";
import ShowChatName from "./ShowChatName";
import {
  chatSelector,
  changeUsernameByUserId,
  addNewChat,
} from "../store/actions/actionsAllUserData";
import { useDispatch } from "react-redux";
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
  const [modalIsOpenChangeUsername, setModalIsOpenChangeUsername] =
    useState(false);
  const [modalIsOpenNewInformationChat, setModalIsOpenNewInformationChat] =
    useState(false);
  const [modalIsOpenNewOffTopicChat, setModalIsOpenNewOffTopicChat] =
    useState(false);

  const openModalChangeUsername = () => {
    setModalIsOpenChangeUsername(true);
  };

  const closeModalChangeUsername = () => {
    setModalIsOpenChangeUsername(false);
  };

  const openModalNewInformationChat = () => {
    setModalIsOpenNewInformationChat(true);
  };

  const closeModalNewInformationChat = () => {
    setModalIsOpenNewInformationChat(false);
  };
  const openModalNewOffTopicChat = () => {
    setModalIsOpenNewOffTopicChat(true);
  };

  const closeModalNewOffTopicChat = () => {
    setModalIsOpenNewOffTopicChat(false);
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
            onClick={openModalChangeUsername}
            src="../../public/ajuste.png"
            alt=""
          />
          <ModalComponent
            registeredId={registeredId}
            username={username}
            dispacher={changeUsernameByUserId}
            isOpen={modalIsOpenChangeUsername}
            closeModal={closeModalChangeUsername}
            title={"Settings"}
            inputLabel={"Nickname"}
            isModalForNameChange={true}
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
            onClick={openModalNewInformationChat}
            src="../../public/agregar.png"
            alt="agregar"
          />
          <ModalComponent
            registeredId={registeredId}
            dispacher={addNewChat}
            isOpen={modalIsOpenNewInformationChat}
            closeModal={closeModalNewInformationChat}
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
            onClick={openModalNewOffTopicChat}
            src="../../public/agregar.png"
            alt="agregar"
          />
          <ModalComponent
            registeredId={registeredId}
            dispacher={addNewChat}
            isOpen={modalIsOpenNewOffTopicChat}
            closeModal={closeModalNewOffTopicChat}
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
