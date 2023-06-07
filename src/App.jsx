import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatTypeSearchBar from "./components/ChatTypeSearchBar";
import MessengerBar from "./components/MessengerBar";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "./components/Modal";
import {
  addNewUser,
  changeUsernameByUserId,
} from "./store/actions/actionsUsers";
import { addPrivateMessage } from "./store/actions/actionsPrivateChats";
import { addMessage, addChannel } from "./store/actions/actionsChannels";
import { addCategory } from "./store/actions/actionsCategories";

function App() {
  const { registeredId } = useSelector((state) => state.chatReducer);
  const { usersData } = useSelector((state) => state.reducerUsers);
  const { privateChats } = useSelector((state) => state.reducerPrivateChats);
  const { channels } = useSelector((state) => state.reducerChannels);
  const { categories } = useSelector((state) => state.reducerCategories);
  const [modalAddNewUser, setModalAddNewUser] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className="app-flex flex">
      {dispatch(
        addMessage(1616885654891, 1616885640333, "asdfasdf", 1621148821439)
      )}
      {dispatch(addCategory(1621148821439, 'Chau'))}
      {console.log(categories)}
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
