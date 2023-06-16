import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatTypeSearchBar from "./components/ChatTypeSearchBar";
import MessengerBar from "./components/MessengerBar";
import ModalComponent from "./components/Modal";

function App() {
  const [registeredId, setRegisteredId] = useState(1616885640001);
  const [showUserOrChannelChatsWithId, setShowUserOrChannelChatsWithId] =
    useState(1616469654891);
  const [isChannel, setIsChannel] = useState(true); //si es true es channel sino es privateChats
  const [modalAddNewUser, setModalAddNewUser] = useState(true);

  return (
    <div className="app-flex flex">
      <ModalComponent
        createRegisteredId={setRegisteredId}
        inputLabel={"Username"}
        chatType={"Write your username"}
        title={"Start New Session"}
        modalFor={"addNewUser"}
        broadcastChannelType={"addNewUser"}
        closeModal={() => setModalAddNewUser(false)}
        isOpen={modalAddNewUser}
      />
      <ChatTypeSearchBar
        registeredId={registeredId}
        updateShowUserOrChannelChatsWithId={setShowUserOrChannelChatsWithId}
        IsChannelOrPrivateChats={setIsChannel}
      />
      <div className="messengerBar_chatBox-flex flex ">
        <MessengerBar
          registeredId={registeredId}
          updateShowUserOrChannelChatsWithId={setShowUserOrChannelChatsWithId}
          IsChannelOrPrivateChats={setIsChannel}
        />
        <ChatBox
          registeredId={registeredId}
          showUserOrChannelChatsWithId={showUserOrChannelChatsWithId}
          isChannel={isChannel}
        />
      </div>
    </div>
  );
}

export default App;
