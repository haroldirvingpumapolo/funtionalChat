import { useState } from "react";
import lupa from "../../public/lupa.png";
import ModalToSearchChat from "./ModalToSearchChat";
function ChatTypeSearchBar() {
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
          title={"Create Group Chat"}
          chatType={"in information"}
          inputLabel={"Chat Name"}
          channelTypeValue={"information"}
        />
      </div>
    </div>
  );
}

export default ChatTypeSearchBar;
