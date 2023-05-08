import ChatBox from "./components/ChatBox";
import ChatTypeSearchBar from "./components/ChatTypeSearchBar";
import MessengerBar from "./components/messengerBar";

function App() {
  return (
    <div className="app-flex flex">
      <ChatTypeSearchBar />
      <div className="messengerBar_chatBox-flex flex ">
        <MessengerBar />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
