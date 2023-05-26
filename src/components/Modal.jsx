import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import styled from "styled-components";

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
  ${({ isModalForNameChange }) => isModalForNameChange && `display: block;`}
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
  isOpen,
  title,
  username,
  chatType,
  inputLabel,
  closeModal,
  isModalForNameChange,
  registeredId,
  dispacher,
  channelTypeValue,
}) => {
  const [newUsernameOrNewChatValue, setNewUsernameOrNewChatValue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setNewUsernameOrNewChatValue(isModalForNameChange ? username : "");
  }, [isModalForNameChange, username]);

  function handleDispatcher() {
    dispatch(
      dispacher(
        isModalForNameChange
          ? /*si es modal para cambiar nombre usara registeredId para el actions changeUsernameByUserId */ registeredId
          : /*si no es modal para cambiar nombre usara channelTypeValue para actions addNewChat */ channelTypeValue,
        newUsernameOrNewChatValue
      )
    );
    setNewUsernameOrNewChatValue(isModalForNameChange ? username : "");
    closeModal();
  }
  function handleCloseModal() {
    setNewUsernameOrNewChatValue(isModalForNameChange ? username : "");
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
          value={newUsernameOrNewChatValue}
          onChange={(e) => setNewUsernameOrNewChatValue(e.target.value)}
          placeholder="Enter a name"
        ></Input>
        {isModalForNameChange && (
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
          <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
          <SaveButton onClick={handleDispatcher}>Save</SaveButton>
        </Buttons>
      </Content>
    </CustomModal>
  );
};

ModalComponent.propTypes = {
  username: PropTypes.string,
  registeredId: PropTypes.number,
  dispacher: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  chatType: PropTypes.string,
  inputLabel: PropTypes.string.isRequired,
  isModalForNameChange: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  channelTypeValue: PropTypes.string,
};

export default ModalComponent;