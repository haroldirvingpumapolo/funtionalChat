import PropTypes from "prop-types";

function Message({ writtenBy, date, text }) {
  return (
    <div className="message-flex flex">
      <img className="message-flex-img" src="../../public/usuario.png"></img>
      <div className="message-container">
        <div className="message-writtenBy_date flex"> 
          <h1 className="message-writtenBy">{writtenBy}</h1>
          <p className="message-date">{date}</p>
        </div>
        <p className="message-text">{text}</p>
      </div>
    </div>
  );
}

Message.propTypes = {
  writtenBy: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;