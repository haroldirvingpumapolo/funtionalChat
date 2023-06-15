import { useSelector } from "react-redux";
import ShowChatName from "./ShowChatName";
import { useState } from "react";
import ModalComponent from "./Modal";
import ModalSetting from "./ModalSetting";
import PropTypes from "prop-types";

function MessengerBar({
  registeredId,
  updateShowUserOrChannelChatsWithId,
  IsChannelOrPrivateChats,
}) {
  const { usersData } = useSelector((state) => state.reducerUsers);
  const { categories } = useSelector((state) => state.reducerCategories);
  const { channels } = useSelector((state) => state.reducerChannels);
  const registeredUser = usersData.find((users) => users.id === registeredId);
  const username = registeredUser.username;
  const [modals, setModals] = useState(() => {
    const initialModals = {
      changeUsernameByUserId: false,
    };
    categories.forEach(({ categoryName }) => {
      const formattedCategoryName = categoryName.replace(/[^\w\s]/gi, '_');
      initialModals[formattedCategoryName] = false;
    });

    return initialModals;
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
            onClick={() => openModal("changeUsernameByUserId")}
            src="../../images/ajuste.png"
            alt=""
          />
          <ModalSetting
            username={username}
            registeredId={registeredId}
            title={"Settings"}
            inputLabel={"Nickname"}
            closeModal={() => closeModal("changeUsernameByUserId")}
            isOpen={modals["changeUsernameByUserId"]}
          />
        </div>
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      {categories.map((category) => {
        const formattedCategoryName = category.categoryName.replace(/[^\w\s]/gi, '_');
        return (
          <div key={category.id}>
            <div className="messengerBar-containe-information messengerBar_separator">
              <h2>{category.categoryName}</h2>
              <img
                onClick={() => openModal(formattedCategoryName)}
                src="../../images/agregar.png"
                alt="agregar"
              />
            </div>
            <ModalComponent
              idCategory={category.id}
              inputLabel={category.categoryName}
              chatType={"in " + category.categoryName}
              title={"Create Group Chat"}
              modalFor={"addChannel"}
              broadcastChannelType={`addChannel${category.id}`}
              closeModal={() => closeModal(formattedCategoryName)}
              isOpen={modals[formattedCategoryName]}
            />
            {channels
              .filter((channel) => channel.idCategory === category.id)
              .map((channel) => (
                <div key={channel.name}>
                  <ShowChatName
                    chatName={channel.name}
                    updateShowUserOrChannelChatsWithId={() => (
                      updateShowUserOrChannelChatsWithId(channel.id),
                      IsChannelOrPrivateChats(true)
                    )}
                  />
                </div>
              ))}
            <div className="separator">
              <div className="separator-container"></div>
            </div>
          </div>
        );
      })}
      <div className="otherUsers">
        <h2>Other Users</h2>
        {usersData
          .filter((user) => user.id != registeredUser.id)
          .map((user) => {
            return (
              <p
                key={user.id}
                className="container-text"
                onClick={() => (
                  updateShowUserOrChannelChatsWithId(user.id),
                  IsChannelOrPrivateChats(false)
                )}
              >
                {user.username}
              </p>
            );
          })}
      </div>
    </div>
  );
}
MessengerBar.propTypes = {
  registeredId: PropTypes.number,
  updateShowUserOrChannelChatsWithId: PropTypes.func,
  IsChannelOrPrivateChats: PropTypes.func,
};

export default MessengerBar;
