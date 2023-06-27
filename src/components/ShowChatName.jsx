import PropTypes from "prop-types";

function ShowChatName({ chatName, updateShowUserOrChannelChatsWithId }) {
  return (
    <div className="container-text" onClick={updateShowUserOrChannelChatsWithId}>
      <img className="hashtag" src="../../images/picadillo.png" alt="hashtag" />
      <p className="messengerBar-text">{chatName}</p>
    </div>
  );
}

ShowChatName.propTypes = {
  chatName: PropTypes.string.isRequired,
  updateShowUserOrChannelChatsWithId: PropTypes.func.isRequired,
};

export default ShowChatName;
