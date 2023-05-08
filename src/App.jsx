import ChatBox from "./components/ChatBox";
import ChatTypeSearchBar from "./components/ChatTypeSearchBar";
import MessengerBar from "./components/messengerBar";

function App() {
  const getFormattedDate = () =>
    new Date()
      .toLocaleString("es", {
        dateStyle: "short",
        timeStyle: "short",
        hour12: true,
      })
      .replace(/[.,m]/g, "")
      .replace("p", "PM")
      .replace("a", "AM");

  return (
    <div className="app-flex flex">
      <ChatTypeSearchBar />
      {getFormattedDate()}
      <div className="messengerBar_chatBox-flex flex ">
        <MessengerBar />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
