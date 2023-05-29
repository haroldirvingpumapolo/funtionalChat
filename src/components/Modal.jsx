import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  changeUsernameByUserId,
  addNewChat,
  addNewUser,
  newUserLogin,
} from "../store/actions/actionsAllUserData";

Modal.setAppElement("#root");

const CustomModal = styled(Modal)`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  width: 460px;
  padding: 8px 10px;
  background-color: white;
  border-radius: 5px;
`;
const Title = styled.h2`
  font-size: 18px;
  color: #1d1d1d;
`;
const ChatTyper = styled.p`
  width: 18px;
  font-size: 12px;
  color: #1d1d1d;
  font-style: italic;
  white-space: nowrap;
`;
const InputLabel = styled.p`
  padding: 0 0 4px;
  color: #616061;
`;

const Input = styled.input`
  width: 100%;
  border: gray 1px solid;
  border-radius: 5px;
  padding: 11.5px 12px;
`;
const ApplicationTheme = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 8px;
  color: #616061;
  font-style: italic;
  user-select: none;
  font-size: 14px;
  cursor: pointer;
`;
const Buttons = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: end;
`;
const CancelButton = styled.button`
  height: 40px;
  width: 70px;
  padding: 5px 10px;
  margin: 0 4px 0 0;
  border: none;
  background-color: transparent;
  font-size: 16px;
  user-select: none;
  cursor: pointer;
`;
const SaveButton = styled.button`
  height: 40px;
  width: 57px;
  padding: 5px 1px;
  margin: 0 0 0 4px;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  background-color: #dddddd;
  color: #1d1c1dbf;
  user-select: none;
  cursor: pointer;
`;
const DivSeparator = styled.hr`
  height: 0.5px;
  border: none;
  background-color: #dddddd;
  margin: 16px 0;
`;

const ModalComponent = ({
  modalFor,
  registeredId,
  username,
  isOpen,
  title,
  chatType,
  inputLabel,
  closeModal,
  channelTypeValue,
}) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const [broadcastChannel, setBroadcastChannel] = useState(null);
  const timestamp = new Date().getTime();

  useEffect(() => {
    setInputValue(modalFor === "changeUsernameByUserId" ? username : "");
    const channel = new BroadcastChannel(modalFor);
    setBroadcastChannel(channel);
    channel.onmessage = (event) => {
      const { inputValue, timestamp, registeredId, channelTypeValue } =
        event.data;
      modalFor === "addNewUser" && dispatch(addNewUser(timestamp, inputValue));
      modalFor === "changeUsernameByUserId" &&
        dispatch(changeUsernameByUserId(registeredId, inputValue));
      modalFor === "addNewChat" &&
        dispatch(addNewChat(channelTypeValue, inputValue));
    };
    return () => {
      channel.close();
    };
  }, [modalFor, username, dispatch, channelTypeValue, registeredId]);

  function saveChanges() {
    modalFor === "addNewUser" && dispatch(addNewUser(timestamp, inputValue));
    modalFor === "addNewUser" && dispatch(newUserLogin(timestamp));
    modalFor === "changeUsernameByUserId" &&
      dispatch(changeUsernameByUserId(registeredId, inputValue));
    modalFor === "addNewChat" &&
      dispatch(addNewChat(channelTypeValue, inputValue));
    if (broadcastChannel) {
      const messageToSend = { timestamp, inputValue };
      broadcastChannel.postMessage(messageToSend);
    }
    setInputValue(modalFor === "changeUsernameByUserId" ? username : "");
    modalFor === "addNewUser" ? closeModal(false) : closeModal();
  }

  function handleCloseModal() {
    setInputValue(modalFor === "changeUsernameByUserId" ? username : "");
    closeModal();
  }
  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Ventana Modal"
    >
      <Content>
        <Title>{title}</Title>
        <ChatTyper>{chatType}</ChatTyper>
        <DivSeparator></DivSeparator>
        <InputLabel>{inputLabel}</InputLabel>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a name"
          onKeyPress={(e) => e.key === "Enter" && saveChanges()}
        ></Input>
        {modalFor === "changeUsernameByUserId" && (
          <>
            <DivSeparator></DivSeparator>
            <ApplicationTheme
              onClick={() => console.log("Cambiando color de tema")}
            >
              Change to Discord Theme
            </ApplicationTheme>
          </>
        )}
        <DivSeparator></DivSeparator>
        <Buttons>
          {modalFor !== "addNewUser" && (
            <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
          )}
          <SaveButton onClick={saveChanges}>Save</SaveButton>
        </Buttons>
      </Content>
    </CustomModal>
  );
};

ModalComponent.propTypes = {
  modalFor: PropTypes.string,
  registeredId: PropTypes.number,
  username: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  chatType: PropTypes.string,
  inputLabel: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
  channelTypeValue: PropTypes.string,
};

export default ModalComponent;
