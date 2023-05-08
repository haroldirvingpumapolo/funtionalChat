import lupa from "../../public/lupa.png";
function ChatTypeSearchBar() {
  return (
    <div className="chatTypeSearchBar-flex flex">
      <div className="chatTypeSearchBar-container container">
        <label>
          <img src={lupa} alt="lupa" />
        </label>
        <input type="text" placeholder="Search grous and chats" value="" />
      </div>
    </div>
  );
}

export default ChatTypeSearchBar;
