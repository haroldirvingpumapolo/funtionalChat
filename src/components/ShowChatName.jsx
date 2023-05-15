import { PropTypes } from "prop-types";

function ShowChatName({ chatName }) {
  return (
    <div className="container-text">
      <img className="hashtag" src="../../public/picadillo.png" alt="hashtag" />
      <p className="messengerBar-text">{chatName}</p>
    </div>
  );
}

ShowChatName.propTypes = {
  chatName: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
};

export default ShowChatName;
