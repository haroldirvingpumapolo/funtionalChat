import { useSelector } from "react-redux";
import ShowChatName from "./ShowChatName";
import { useState } from "react";
import ModalComponent from "./Modal";
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
  const [modals, setModals] = useState(() => {
    const initialModals = {
      changeUsernameByUserId: false,
    };
    categories.forEach(({ categoryName }) => {
      const formattedCategoryName = categoryName.replace(/-/g, "_");
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
            <p className="user">{registeredUser.username}</p>
          </div>
          <img
            onClick={() => openModal("changeUsernameByUserId")}
            src="../../images/ajuste.png"
            alt=""
          />
          <ModalComponent
            modalFor={"changeUsernameByUserId"}
            registeredId={registeredId}
            username={registeredUser.username}
            isOpen={modals["changeUsernameByUserId"]}
            closeModal={() => closeModal("changeUsernameByUserId")}
            title={"Settings"}
            inputLabel={"Nickname"}
          />
        </div>
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>

      {categories.map((category) => {
        const formattedCategoryName = category.categoryName.replace(/-/g, "_");
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
              modalFor={"addChannel"}
              registeredId={registeredId}
              isOpen={modals[formattedCategoryName]}
              closeModal={() => closeModal(formattedCategoryName)}
              title={"Create Group Chat"}
              chatType={"in " + category.categoryName}
              inputLabel={"Chat Name"}
              channelTypeValue={category.categoryName}
            />
            {channels
              .filter((channel) => channel.idCategory === category.id)
              .map((channel) => (
                <ShowChatName
                  key={channel.id}
                  chatName={channel.name}
                  updateShowUserOrChannelChatsWithId={() => (
                    updateShowUserOrChannelChatsWithId(channel.id),
                    IsChannelOrPrivateChats(true)
                  )}
                />
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
