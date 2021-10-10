import React from "react";
import styled, { keyframes } from "styled-components";
import { auth } from "../firebase";
import FallbackAvatar from "./material-components/FallbackAvatar";
import LogoutButton from "../components/LogoutButton";
import { useHistory } from "react-router";

function TitleBar() {
  const history = useHistory("");

  const handleClick = () => {
    history.push("/profile");
  };

  return (
    <>
      <Container>
        <TitleTextContainer>
          <TitleText>
            භෞතික විද්‍යාවේ <DigitalText>Digital</DigitalText> මෙහෙයුම.
          </TitleText>
        </TitleTextContainer>

        <AvatarContainer onClick={handleClick}>
          <FallbackAvatar
            username={auth?.currentUser?.displayName}
            profilePhotoURL={auth?.currentUser?.photoURL}
          />
        </AvatarContainer>
      </Container>

      <LogoutButton />
    </>
  );
}

export default TitleBar;

const Container = styled.div`
  /* background-color: #66b3ff; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  background-image: linear-gradient(to right, #66b300, #66b3ff);

  /* TEST */
  @media only screen and (max-width: 900px) {
    font-size: 60%;
  }
`;

const TitleTextContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const TitleText = styled.h1``;

const DigitalTextAnimation = keyframes`

    0% {
      color: #ff0000;
    }
    25% {
      color: #fc7f03;
    }
    50% {
      color: #f0fc03;
    }
    75% {
      color: #03fc17;
    }
    100% {
      color: #0b03fc;
    }
  
`;

const DigitalText = styled.em`
  text-transform: uppercase;
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Play:wght@400;700&display=swap");
  font-family: "IBM Plex Mono", monospace;
  font-family: "Play", sans-serif;
  animation: ${DigitalTextAnimation} 5s infinite;
`;

const AvatarContainer = styled.div`
  cursor: pointer;
`;
