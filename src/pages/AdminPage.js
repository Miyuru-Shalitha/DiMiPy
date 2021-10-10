import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled, { keyframes } from "styled-components";
import ClassSection from "../components/ClassSection";
import PrivateChatSection from "../components/PrivateChatSection";
import PublicChatSection from "../components/PublicChatSection";
import TitleBar from "../components/TitleBar";
import VideosSection from "../components/VideosSection";
import { auth, db } from "../firebase";
import LogoCircles from "../assets/logo-circles.svg";
import LogoRoundedText from "../assets/logo-rounded-text.svg";

function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [selectedClassCode, setSeletedClassCode] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [videoCount, setVideoCount] = useState(0);
  const history = useHistory("");

  useEffect(() => {
    if (auth.currentUser) {
      db.collection("admins")
        .doc(auth.currentUser.uid)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            setIsAuthorized(false);

            setTimeout(() => {
              history.push("/");
            }, 3000);
          } else {
            setIsAuthorized(true);
          }
        });
    }

    console.log(isAuthorized);
  }, [auth.currentUser]);

  if (!isAuthorized) {
    return (
      <>
        {isAuthorized === null ? ( // Must check isAuthorized === false because isAuthorized initial value is null.
          <LoadingContainer>
            <ImagesContainer>
              <LoadingImageCircle src={LogoCircles} alt="loading" />
              <LoadingImageRoundedText src={LogoRoundedText} alt="loading" />
            </ImagesContainer>
          </LoadingContainer>
        ) : (
          <Warning>
            <WarningText>Unauthorized!</WarningText>
            <h2>Redirecting to root...</h2>
          </Warning>
        )}
      </>
    );
  }

  return (
    <Container>
      <TitleBar />

      <BodyContainer>
        <ClassSection
          selectedClassCode={selectedClassCode}
          setSeletedClassCode={setSeletedClassCode}
          selectedLessonId={selectedLessonId}
          setSelectedLessonId={setSelectedLessonId}
          videoCount={videoCount}
        />

        <VideosSection
          selectedClassCode={selectedClassCode}
          selectedLessonId={selectedLessonId}
          setVideoCount={setVideoCount}
        />

        <PrivateChatSection selectedClassCode={selectedClassCode} />

        <PublicChatSection selectedClassCode={selectedClassCode} />
      </BodyContainer>
    </Container>
  );
}

export default AdminPage;

const LoadingContainer = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagesContainer = styled.div`
  flex: 0 0 20rem;
  height: 20rem;

  position: relative;
`;

const LoadingImageCircle = styled.img`
  width: 20rem;
  height: 20rem;

  position: absolute;
  top: 0;
  left: 0;
`;

const LoadingAnimation = keyframes`
from {
  transform: rotate(0);
}
to {
  transform: rotate(360deg);
}
`;

const LoadingImageRoundedText = styled.img`
  width: 20rem;
  height: 20rem;

  position: absolute;
  top: 0;
  left: 0;

  animation: ${LoadingAnimation} 5s linear infinite;
`;

const Warning = styled.div`
  background-color: #000;
  color: #ff0000;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WarningText = styled.h1`
  font-size: 4rem;
`;

const Container = styled.div`
  /* TEST */
  @media only screen and (max-width: 900px) {
    font-size: 70%;
  }
`;

const BodyContainer = styled.div`
  display: flex;

  /* TEST */
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
