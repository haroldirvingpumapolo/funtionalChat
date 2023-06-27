import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeUsernameByUserId } from "../store/actions/actionsUsers";

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

const ModalSetting = ({
  registeredId,
  title,
  inputLabel,
  closeModal,
  isOpen,
  username,
}) => {
  const [inputValue, setInputValue] = useState();
  const dispatch = useDispatch();
  const [broadcastChannel, setBroadcastChannel] = useState(null);

  useEffect(() => {
    setInputValue(username);
    const channel = new BroadcastChannel("changeUsernameByUserId");
    setBroadcastChannel(channel);

    channel.onmessage = (event) => {
      const { registeredId, inputValue } = event.data;
      dispatch(changeUsernameByUserId(registeredId, inputValue));
    };

    return () => {
      channel.close();
    };
  }, [dispatch, username]);

  function saveChanges() {
    dispatch(changeUsernameByUserId(registeredId, inputValue));
    if (broadcastChannel) {
      const messageToSend = {
        registeredId,
        inputValue,
      };
      broadcastChannel.postMessage(messageToSend);
    }
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
        <DivSeparator></DivSeparator> <InputLabel>{inputLabel}</InputLabel>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a name"
          onKeyPress={(e) => e.key === "Enter" && saveChanges()}
        ></Input>
        <DivSeparator></DivSeparator>
        <ApplicationTheme
          onClick={() => console.log("Cambiando color de tema")}
        >
          Change to Discord Theme
        </ApplicationTheme>
        <DivSeparator></DivSeparator>
        <Buttons>
          <SaveButton onClick={saveChanges}>Save</SaveButton>
        </Buttons>
      </Content>
    </CustomModal>
  );
};

ModalSetting.propTypes = {
  registeredId: PropTypes.number,
  inputLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  username: PropTypes.string,
};
export default ModalSetting;
