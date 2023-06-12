import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatTypeSearchBar from "./components/ChatTypeSearchBar";
import MessengerBar from "./components/MessengerBar";
import ModalComponent from "./components/Modal";

function App() {
  const [registeredId, setRegisteredId] = useState(1616885640001);
  const [showUserOrChannelChatsWithId, setShowUserOrChannelChatsWithId] =
    useState(1616469654891);
  const [isChannel, setIsChannel] = useState(true); //si no es channel es privateChats
  const [modalAddNewUser, setModalAddNewUser] = useState(false);

  return (
    <div className="app-flex flex">
      <ModalComponent
        registeredId={registeredId}
        createRegisteredId={setRegisteredId}
        modalFor={"addNewUser"}
        isOpen={modalAddNewUser}
        closeModal={() => setModalAddNewUser(false)}
        title={"Start New Session"}
        chatType={"Write your username"}
        inputLabel={"Username"}
        channelTypeValue={"information"}
      />
      <ChatTypeSearchBar />
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
