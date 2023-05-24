import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatTypeSearchBar from "./components/ChatTypeSearchBar";
import MessengerBar from "./components/MessengerBar";
import { useDispatch } from "react-redux";
import { addNewUser, newUserLogin } from "./store/actions/actionsAllUserData";

function App() {
  const [newUserValue, setNewUserValue] = useState("");
  const dispatch = useDispatch();
  const [broadcastChannel, setBroadcastChannel] = useState(null);
  const timestamp = new Date().getTime();

  useEffect(() => {
    const channel = new BroadcastChannel("addNewUser");
    setBroadcastChannel(channel);
    channel.onmessage = (event) => {
      const { timestamp, newUserValue } = event.data;
      dispatch(addNewUser(timestamp, newUserValue));
    };
    return () => {
      channel.close();
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewUser(timestamp, newUserValue));
    dispatch(newUserLogin(timestamp));

    if (broadcastChannel) {
      const messageToSend = { timestamp, newUserValue };
      broadcastChannel.postMessage(messageToSend);
    }

    setNewUserValue("");
  };

  return (
    <div className="app-flex flex">
      <div className=" flex">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newUserValue}
            onChange={(e) => setNewUserValue(e.target.value)}
          />
        </form>
        Escribe tu nombre de usuario para iniciar como nuevo usuario
      </div>
      <ChatTypeSearchBar />
      <div className="messengerBar_chatBox-flex flex ">
        <MessengerBar />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
