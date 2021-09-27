import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getUserDataFromUserId from "../dbFunctions/getUserDataFromUserId";
import { auth } from "../firebase";
import FallbackAvatar from "./material-components/FallbackAvatar";

function ChatBox({ chatData }) {
    const [chatUserData, setChatUserData] = useState({
        username: "",
        profilePhoto: "",
    });

    useEffect(() => {
        getUserDataFromUserId(chatData.userId)
            .then((userData) => {
                // console.log(userData);
                setChatUserData(userData);
            })
            .catch((err) => alert(err.message));
    }, []);

    return (
        <>
            {chatData.userId === auth?.currentUser?.uid ? (
                <UserContainer>
                    <UserFallbackAvatarContainer>
                        <FallbackAvatar
                            size="small"
                            username={chatUserData.username}
                            profilePhotoURL="https://lh3.googleusercontent.com/a-/AOh14GjIk7WKI6OgEtqZE1uIXK7r7H7bJNwyEOPmVqLK=s96-c"
                        />
                    </UserFallbackAvatarContainer>

                    <UserChatText>{chatData.message}</UserChatText>
                    <UserChatUsername>{chatUserData.username}</UserChatUsername>
                </UserContainer>
            ) : (
                <Container>
                    <FallbackAvatarContainer>
                        <FallbackAvatar
                            size="small"
                            username={chatUserData.username}
                            profilePhotoURL="https://lh3.googleusercontent.com/a-/AOh14GjIk7WKI6OgEtqZE1uIXK7r7H7bJNwyEOPmVqLK=s96-c"
                        />
                    </FallbackAvatarContainer>

                    <ChatText>{chatData.message}</ChatText>
                    <ChatUsername>{chatUserData.username}</ChatUsername>
                </Container>
            )}
        </>
    );
}

export default ChatBox;

const Container = styled.div`
    padding: 1rem;
    position: relative;
    display: flex;
`;

const FallbackAvatarContainer = styled.div`
    position: absolute;
    top: -0.5rem;
    left: 0;
`;

const ChatText = styled.span`
    /* font-size: 1rem; */
    background-color: #00e600;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #fff;
`;

const ChatUsername = styled.h6`
    position: absolute;
    top: 0;
    left: 2.5rem;
`;

//////////////////////////////////////////////////

const UserContainer = styled.div`
    padding: 1rem;
    position: relative;
    display: flex;
    justify-content: flex-end;
`;

const UserFallbackAvatarContainer = styled.div`
    position: absolute;
    top: -0.5rem;
    right: 0;
`;

const UserChatText = styled.span`
    background-color: #10abe8;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #fff;
`;

const UserChatUsername = styled.h6`
    position: absolute;
    top: 0;
    right: 2.5rem;
`;
