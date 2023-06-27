import { useState } from "react";
import lupa from "../../public/images/lupa.png";
import ModalToSearchChat from "./ModalToSearchChat";
import PropTypes from "prop-types";

function ChatTypeSearchBar({
  registeredId,
  updateShowUserOrChannelChatsWithId,
  IsChannelOrPrivateChats,
}) {
  const [modals, setModals] = useState(false);
  const openModal = () => {
    setModals(true);
  };
  const closeModal = () => {
    setModals(false);
  };
  return (
    <div className="chatTypeSearchBar-flex flex">
      <div className="chatTypeSearchBar-container container">
        <label>
          <img src={lupa} alt="lupa" />
        </label>
        <input
          type="text"
          value="Search grous and chats"
          readOnly
          onClick={() => openModal()}
        />
        <ModalToSearchChat
          isOpen={modals}
          closeModal={closeModal}
          registeredId={registeredId}
          updateShowUserOrChannelChatsWithId={
            updateShowUserOrChannelChatsWithId
          }
          IsChannelOrPrivateChats={IsChannelOrPrivateChats}
        />
      </div>
    </div>
  );
}
ChatTypeSearchBar.propTypes = {
  registeredId: PropTypes.number,
  updateShowUserOrChannelChatsWithId: PropTypes.func,
  IsChannelOrPrivateChats: PropTypes.func,
};

export default ChatTypeSearchBar;
