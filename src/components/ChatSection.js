import Divider from "@material-ui/core/Divider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatBox from "./ChatBox";
import sendPublicMessage from "../dbFunctions/sendPublicMessage";
import getPublicMessages from "../dbFunctions/getPublicMessages";

function ChatSection({ classData }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState("");

  useEffect(() => {
    if (classData.classCode !== "") {
      const unsubscribe = getPublicMessages(classData.classCode, setChat);

      return unsubscribe;
    }
  }, [classData]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    sendPublicMessage(classData.classCode, message, setMessage);
  };

  return (
    <Container>
      <ChatContainer>
        {chat &&
          chat.map(({ chatId, chat }) => (
            <ChatBox key={chatId} chatData={chat} />
          ))}
      </ChatContainer>

      <SendMessageContainer>
        <Divider />

        <SendMessageForm onSubmit={handleSendMessage}>
          <MessageInput
            placeholder="Send a message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
        </SendMessageForm>
      </SendMessageContainer>
    </Container>
  );
}

export default ChatSection;

const Container = styled.div`
  background-color: #00ffbf;
  height: 100%;
  padding: 0.5rem;
`;

const ChatContainer = styled.div`
  height: 80%;
  overflow-y: scroll;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SendMessageContainer = styled.div`
  @media (max-width: 600px) {
    flex-direction: column;
    position: fixed;
    width: 88vw;
    bottom: 0;
  }
`;

const SendMessageForm = styled.form`
  display: flex;
  margin-top: 1rem;
`;

const MessageInput = styled.input`
  padding: 0.5rem;
  flex: 1;
  border-radius: 0.5rem;
  border: 0.16rem solid #009150;
  outline: none;

  :hover {
    border: 0.16rem solid #87ffc9;
  }

  :focus {
    border: 0.16rem solid #ffdb59;
  }
`;
