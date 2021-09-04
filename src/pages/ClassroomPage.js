import React, { useEffect } from "react";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import LogoutButton from "../components/LogoutButton";
import TitleBar from "../components/TitleBar";
import VideoPlayer from "../components/VideoPlayer";
import { getClass2021TKu } from "../dbFunctions/getClassroomData";
import { getUserClassroomData } from "../dbFunctions/getUserClassroomData";

function ClassroomPage() {
  useEffect(() => {
    getClass2021TKu();
    getUserClassroomData("6aOYAyz5v2V6IjjN4CsdXLu77Qn1");
  }, []);

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
