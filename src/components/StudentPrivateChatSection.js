import Divider from "@material-ui/core/Divider";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ChatBox from "./ChatBox";
import sendPrivateMessage from "../dbFunctions/sendPrivateMessage";
import { auth } from "../firebase";
import getPrivateMessages from "../dbFunctions/getPrivateMessages";

function StudentPrivateChatSection({ classData, setShowPrivateChat }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState("");

  useEffect(() => {
    if (classData.classCode !== "") {
      const unsubscribe = getPrivateMessages(
        auth.currentUser.uid,
        setChat,
        true
      );

      return unsubscribe;
    }
  }, [classData]);

  const handleSendPrivateMessage = (e) => {
    e.preventDefault();

    sendPrivateMessage(message, setMessage);
  };

  return (
    <Container>
      <button
        onClick={() => {
          setShowPrivateChat(false);
        }}
      >
        Show Public Chat Section
      </button>

      <ChatContainer>
        {chat &&
          chat.map(({ chatId, chat }) => (
            <ChatBox
              key={chatId}
              chatId={chatId}
              chatData={chat}
              classCode={classData?.classCode}
              isPrivate={true}
            />
          ))}
      </ChatContainer>

      <SendMessageContainer>
        <Divider />

        <SendMessageForm onSubmit={handleSendPrivateMessage}>
          <MessageInput
            placeholder="Send a private message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />

          <SendButton type="submit">Send</SendButton>
        </SendMessageForm>
      </SendMessageContainer>
    </Container>
  );
}

export default StudentPrivateChatSection;

const moveInFromRight = keyframes`
from {
    transform: translateX(100%);
}
to {
    transform: translateX(0%);
}
`;

const Container = styled.div`
  background-color: #f5dd42;
  padding: 0.5rem;
  flex: 1;
  animation: ${moveInFromRight} 1s;

  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    /* height: 56vh; */
    flex: 0 0 60vh;
  }
`;

const ChatContainer = styled.div`
  /* height: 80vh; */
  /* flex: 0 0 82vh; */
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column-reverse;

  @media (max-width: 600px) {
    /* height: 48vh; */
    flex: 0 0 43vh;
  }
`;

const SendMessageContainer = styled.div`
  /* @media (max-width: 600px) {
        flex-direction: column;
        position: fixed;
        width: 88vw;
        bottom: 0;
    } */
`;

const SendMessageForm = styled.form`
  display: flex;
  margin-top: 1rem;
`;

const MessageInput = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  flex: 1;
  border-radius: 0.5rem;
  border: 0.16rem solid #009150;
  outline: none;
  transition: all 0.2s;

  :hover {
    border: 0.16rem solid #87ffc9;
  }

  :focus {
    border: 0.16rem solid #ffdb59;
  }
`;

const SendButton = styled.button`
  border-radius: 0.5rem;
  border: none;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.6);
  }
`;
