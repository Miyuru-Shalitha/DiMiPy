import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ADMIN_ROUTE } from "../constants/routes";
import { deleteChat, deletePrivateChat } from "../dbFunctions/deleteChat";
import getUserDataFromUserId from "../dbFunctions/getUserDataFromUserId";
import { auth } from "../firebase";
import FallbackAvatar from "./material-components/FallbackAvatar";

function ChatBox({ chatId, chatData, classCode, studentId = null, isPrivate }) {
    // studentId is for admin private chat section.
    const [chatUserData, setChatUserData] = useState("");

    useEffect(() => {
        getUserDataFromUserId(chatData.userId)
            .then((userData) => {
                // console.log(userData);
                setChatUserData(userData);
            })
            .catch((err) => alert(err.message));
    }, []);

    const handleDeleteChat = () => {
        if (!isPrivate) {
            deleteChat(classCode, chatId);
        } else {
            if (studentId) {
                deletePrivateChat(studentId, chatId);
            } else {
                deletePrivateChat(chatData.userId, chatId);
            }
        }
    };

    return (
        <>
            {chatData.userId === auth?.currentUser?.uid ? (
                <UserContainer>
                    <UserFallbackAvatarContainer>
                        <FallbackAvatar
                            size="small"
                            username={chatUserData?.username}
                            profilePhotoURL={chatUserData?.profileAvatarURL}
                        />
                    </UserFallbackAvatarContainer>

                    <UserChatText>{chatData.message}</UserChatText>
                    <UserChatUsername>
                        {chatUserData?.username}
                    </UserChatUsername>

                    <UserDeleteButton onClick={handleDeleteChat}>
                        X
                    </UserDeleteButton>
                </UserContainer>
            ) : (
                <Container>
                    <FallbackAvatarContainer>
                        <FallbackAvatar
                            size="small"
                            username={chatUserData?.username}
                            profilePhotoURL={chatUserData?.profileAvatarURL}
                        />
                    </FallbackAvatarContainer>

                    <ChatText>{chatData.message}</ChatText>
                    <ChatUsername>{chatUserData?.username}</ChatUsername>

                    {window.location.pathname === ADMIN_ROUTE && (
                        <DeleteButton onClick={handleDeleteChat}>
                            X
                        </DeleteButton>
                    )}
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
    max-width: 10rem;
    word-wrap: break-word;
`;

const ChatUsername = styled.h6`
    position: absolute;
    top: 0;
    left: 2.5rem;
`;

const DeleteButton = styled.button`
    position: absolute;
    left: 0;
    bottom: 0.3rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: transparent;
    transition: all 0.2s;

    &:hover {
        background-color: #cc5656;
        color: #fff;
        box-shadow: 0.16rem 0.16rem 0.64rem rgba(0, 0, 0, 0.5);
    }

    &:active {
        background-color: #ff0000;
        transform: translateY(1px);
        color: #fff;
        box-shadow: 0.16rem 0.16rem 0.32rem rgba(0, 0, 0, 0.5);
    }
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
    max-width: 10rem;
    word-wrap: break-word;
`;

const UserChatUsername = styled.h6`
    position: absolute;
    top: 0;
    right: 2.5rem;
`;

const UserDeleteButton = styled.button`
    position: absolute;
    right: 0;
    bottom: 0.3rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: transparent;
    transition: all 0.2s;

    &:hover {
        background-color: #cc5656;
        color: #fff;
        box-shadow: 0.16rem 0.16rem 0.64rem rgba(0, 0, 0, 0.5);
    }

    &:active {
        background-color: #ff0000;
        transform: translateY(1px);
        color: #fff;
        box-shadow: 0.16rem 0.16rem 0.32rem rgba(0, 0, 0, 0.5);
    }
`;
