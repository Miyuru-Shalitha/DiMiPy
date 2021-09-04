import React from "react";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import LogoutButton from "../components/LogoutButton";
import TitleBar from "../components/TitleBar";
import VideoPlayer from "../components/VideoPlayer";

function ClassroomPage() {
  return (
    <Container>
      <TitleBar />

      <BodyContainer>
        <VideoPlayerContainer>
          <VideoPlayer />
        </VideoPlayerContainer>

        <ChatSectionContainer>
          <ChatSection />
        </ChatSectionContainer>
      </BodyContainer>

      <LogoutButton />
    </Container>
  );
}

export default ClassroomPage;

const Container = styled.div`
  height: 100vh;
`;

const BodyContainer = styled.div`
  display: flex;
  height: 100%;
`;

const VideoPlayerContainer = styled.div`
  flex: 3;
`;

const ChatSectionContainer = styled.div`
  flex: 1;
`;
