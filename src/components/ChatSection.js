import Divider from "@material-ui/core/Divider";
import React, { useState } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import ChatBox from "./ChatBox";
import firebase from "firebase";

function ChatSection({ classData }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Extract this code to sendMessage.js
    db.collection("chats")
      .doc(classData.classCode)
      .collection("chat")
      .add({
        userId: auth.currentUser.uid,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <ChatContainer>
        <ChatBox />
        <ChatBox />
        <ChatBox />
        <ChatBox />
        <ChatBox />
      </ChatContainer>

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
