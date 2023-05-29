import { PropTypes } from "prop-types";
import { chatSelector } from "../store/actions/actionsAllUserData";
import { useDispatch } from "react-redux";

function ShowChatName({ chatName, channelType }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(chatSelector(channelType, chatName));
  };

  return (
    <div className="container-text" onClick={handleClick}>
      <img className="hashtag" src="../../public/images/picadillo.png" alt="hashtag" />
      <p className="messengerBar-text">{chatName}</p>
    </div>
  );
}

ShowChatName.propTypes = {
  chatName: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
};

export default ShowChatName;
