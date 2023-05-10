import { PropTypes } from "prop-types";

function OnlyMessage({ text }) {
  return <p className="message-text-only">{text}</p>;
}
OnlyMessage.PropTypes = {
  text: PropTypes.string.isRequired,
};
export default OnlyMessage;
