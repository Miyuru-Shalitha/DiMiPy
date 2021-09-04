import React from "react";
import styled from "styled-components";
import ChatBox from "./ChatBox";

function ChatSection() {
  return (
    <Container>
      <ChatBox />
      <ChatBox />
      <ChatBox />
      <ChatBox />
      <ChatBox />
    </Container>
  );
}

export default ChatSection;

const Container = styled.div`
  background-color: #00ffbf;
  height: 100%;
  padding: 0.5rem;
`;
