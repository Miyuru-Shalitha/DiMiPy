import React from "react";
import styled from "styled-components";
import FallbackAvatar from "./material-components/FallbackAvatar";

function ChatBox() {
  return (
    <Container>
      <FallbackAvatarContainer>
        <FallbackAvatar
          size="small"
          username="Hello, world!"
          profilePhoto="https://lh3.googleusercontent.com/a-/AOh14GjIk7WKI6OgEtqZE1uIXK7r7H7bJNwyEOPmVqLK=s96-c"
        />
      </FallbackAvatarContainer>

      <ChatText>Hello, world!</ChatText>
    </Container>
  );
}

export default ChatBox;

const Container = styled.div`
  padding: 1.3rem;
  position: relative;
`;

const ChatText = styled.span`
  /* font-size: 1rem; */
  background-color: #00e600;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const FallbackAvatarContainer = styled.div`
  position: absolute;
  top: -0.5rem;
  left: 0;
`;
