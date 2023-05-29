import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import lupa from "../../images/lupa.png";
import xIcon from "../../images/x.png";
import hashtag from "../../images/picadillo.png";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "../store/actions/actionsAllUserData";

const ImgLupa = styled.img`
  width: 17px;
  height: 17px;
  translate: 0 1px;
`;
const ImgXIcon = styled.img`
  width: 14px;
  height: 14px;
  translate: 0 1px;
`;
const ImgHashtag = styled.img`
  width: 16px;
  height: 16px;
`;
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
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DivInput = styled.div`
  padding: 8px 12px;
  width: 100%;
  height: 42px;
  display: flex;
  border-radius: 7px;
  border: gray 1px solid;
`;
const DivInputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;
`;
const Input = styled.input`
  border-radius: 7px;
  width: 382px;
  height: 24px;
  background: none;
  border: none;
  font-size: 100%;
`;
const DivSeparator = styled.hr`
  height: 0.5px;
  width: 436px;
  border: none;
  background-color: #dddddd;
  margin: 16px 0;
`;
const DivShowChats = styled.div`
  width: 100%;
  padding: 0px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChatTypesTitle = styled.h1`
  width: 100%;
  height: 24px;
  padding: 0;
  text-transform: capitalize;
`;
const ChatDivFlex = styled.div`
  width: 100%;
  height: 29px;
  padding: 4px 0px;
  display: flex;
  justify-content: space-between;
  user-select: none;
`;
const NameChatDivContainer = styled.div`
  display: flex;
`;
const NameChatPagharth = styled.p`
  font-size: 14px;
  padding: 0 0 0 8px;
`;
const TypeChatLabel = styled.div`
  font-size: 12px;
  font-style: italic;
  text-transform: capitalize;
`;
const NoResults = styled.p`
  font-size: 16px;
  font-style: italic;
  text-transform: capitalize;
`;
const ModalToSearchChat = ({ isOpen, closeModal }) => {
  const [inputValue, setInputValue] = useState("");
  const { allUserData, registeredId } = useSelector(
    (state) => state.chatReducer
  );
  const sessionIdOf = allUserData.find(
    (users) => users.idUser === registeredId
  );
  const dispatch = useDispatch();

  function dispatcher(channelTypeValue, channelNameValue) {
    dispatch(chatSelector(channelTypeValue, channelNameValue));
    closeModal();
  }

  const channelNames = {};
  Object.keys(sessionIdOf).forEach((prop) => {
    if (sessionIdOf[prop].channels) {
      channelNames[prop] = sessionIdOf[prop].channels.map((channel) =>
        isNaN(channel.channelName)
          ? channel.channelName.toLowerCase()
          : channel.channelName
      );
    }
  });

  const idsConvertedToNames = { ...channelNames };
  idsConvertedToNames.otherUsers = idsConvertedToNames.otherUsers.map(
    (idUsers) => allUserData.find((user) => user.idUser === idUsers).username
  );

  const filteredObject = {};
  Object.keys(idsConvertedToNames).forEach((prop) => {
    filteredObject[prop] = idsConvertedToNames[prop].filter((item) =>
      item.includes(inputValue.toLowerCase())
    );
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Ventana Modal"
    >
      <Content>
        <DivInput>
          <DivInputContainer>
            <ImgLupa src={lupa} alt="lupa" />
            <Input
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search grous and chats"
            />
            <ImgXIcon
              src={xIcon}
              onClick={closeModal}
              alt="closeModal"
            ></ImgXIcon>
          </DivInputContainer>
        </DivInput>
        <DivShowChats>
          {Object.keys(filteredObject).some(
            (prop) => filteredObject[prop].length > 0
          ) ? (
            Object.keys(filteredObject).map(
              (prop) =>
                filteredObject[prop].length > 0 && (
                  <div key={prop}>
                    <DivSeparator></DivSeparator>
                    <ChatTypesTitle>
                      {prop.replace(/([A-Z])/g, "-$1")}
                    </ChatTypesTitle>
                    {filteredObject[prop].map((channelName) => (
                      <ChatDivFlex
                        key={`${prop}-${channelName}-`}
                        onClick={() => dispatcher(prop, channelName)}
                      >
                        <NameChatDivContainer>
                          <ImgHashtag src={hashtag} alt="hashtag" />
                          <NameChatPagharth>{channelName}</NameChatPagharth>
                        </NameChatDivContainer>
                        <TypeChatLabel>
                          {prop.replace(/([A-Z])/g, "-$1")}
                        </TypeChatLabel>
                      </ChatDivFlex>
                    ))}
                  </div>
                )
            )
          ) : (
            <NoResults>No Results</NoResults>
          )}
        </DivShowChats>
      </Content>
    </CustomModal>
  );
};

ModalToSearchChat.propTypes = {
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

export default ModalToSearchChat;
