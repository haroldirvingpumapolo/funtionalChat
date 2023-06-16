import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import lupa from "../../public/images/lupa.png";
import xIcon from "../../public/images/x.png";
import hashtag from "../../public/images/picadillo.png";
import { useSelector } from "react-redux";

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
const ModalToSearchChat = ({
  isOpen,
  closeModal,
  updateShowUserOrChannelChatsWithId,
  IsChannelOrPrivateChats,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { usersData } = useSelector((state) => state.reducerUsers);
  const { channels } = useSelector((state) => state.reducerChannels);
  const { categories } = useSelector((state) => state.reducerCategories);

  const channelAndUserNames = {};
  categories.forEach((category) => {
    channelAndUserNames[category.id] = channels.filter(
      (channel) => channel.idCategory === category.id
    );
  });
  channelAndUserNames.users = [...usersData];

  const filteredObject = {};
  Object.keys(channelAndUserNames).forEach((channelOrUserName) => {
    filteredObject[channelOrUserName] = channelAndUserNames[
      channelOrUserName
    ].filter((item) => {
      const name = item?.name || item.username;
      return name.toLowerCase().includes(inputValue.toLowerCase());
    });
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
              onClick={() => (closeModal(), setInputValue(""))}
              alt="closeModal"
            ></ImgXIcon>
          </DivInputContainer>
        </DivInput>
        <DivShowChats>
          {Object.keys(filteredObject).map((prop) => {
            const categoryName = categories.find(
              (category) => category.id == prop
            );
            if (filteredObject[prop].length === 0) {
              return null;
            } else {
              return (
                <div key={prop}>
                  <DivSeparator></DivSeparator>
                  <ChatTypesTitle>
                    {categoryName?.categoryName || "Users"}
                  </ChatTypesTitle>
                  {filteredObject[prop].map((name) => {
                    return (
                      <ChatDivFlex
                        key={`${prop}-${name.id}-`}
                        onClick={() => (
                          updateShowUserOrChannelChatsWithId(name.id),
                          closeModal(),
                          setInputValue(""),
                          prop == "users" //si es true es channel y si es false es privateChats osea necesito ids de usuarios
                            ? IsChannelOrPrivateChats(false)
                            : IsChannelOrPrivateChats(true)
                        )}
                      >
                        <NameChatDivContainer>
                          <ImgHashtag src={hashtag} alt="hashtag" />
                          <NameChatPagharth>
                            {name?.name || name.username}
                          </NameChatPagharth>
                        </NameChatDivContainer>
                        <TypeChatLabel>
                          {categoryName?.categoryName || "User"}
                        </TypeChatLabel>
                      </ChatDivFlex>
                    );
                  })}
                </div>
              );
            }
          })}
          {Object.keys(filteredObject).every(
            (prop) => filteredObject[prop].length === 0
          ) && <NoResults>No Results</NoResults>}
        </DivShowChats>
      </Content>
    </CustomModal>
  );
};

ModalToSearchChat.propTypes = {
  registeredId: PropTypes.number,
  updateShowUserOrChannelChatsWithId: PropTypes.func,
  IsChannelOrPrivateChats: PropTypes.func,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
};

export default ModalToSearchChat;
