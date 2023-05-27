import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatTypeSearchBar from "./components/ChatTypeSearchBar";
import MessengerBar from "./components/MessengerBar";
import { useSelector } from "react-redux";
import ModalComponent from "./components/Modal";

function App() {
  const { registeredId } = useSelector((state) => state.chatReducer);
  const [modalAddNewUser, setModalAddNewUser] = useState(true);
  

  return (
    <div className="app-flex flex">
      <ModalComponent
        registeredId={registeredId}
        modalFor={"addNewUser"}
        isOpen={modalAddNewUser}
        closeModal={setModalAddNewUser}
        title={"Start New Session"}
        chatType={"Write your username"}
        inputLabel={"Username"}
        channelTypeValue={"information"}
      />
      <ChatTypeSearchBar />
      <div className="messengerBar_chatBox-flex flex ">
        <MessengerBar />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
