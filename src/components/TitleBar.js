import React from "react";
import styled, { keyframes } from "styled-components";
import { auth } from "../firebase";
import FallbackAvatar from "./material-components/FallbackAvatar";
import LogoutButton from "../components/LogoutButton";

function TitleBar() {
    return (
        <>
            <Container>
                <TitleTextContainer>
                    <TitleText>
                        භෞතික විද්‍යාවේ <DigitalText>Digital</DigitalText>{" "}
                        මෙහෙයුම.
                    </TitleText>
                </TitleTextContainer>

                <FallbackAvatar
                    username={auth?.currentUser?.displayName}
                    profilePhotoURL="https://lh3.googleusercontent.com/a-/AOh14GjIk7WKI6OgEtqZE1uIXK7r7H7bJNwyEOPmVqLK=s96-c"
                />
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
    animation: ${DigitalTextAnimation} 5s infinite;
`;
