import Divider from "@material-ui/core/Divider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatBox from "./ChatBox";
import sendPublicMessage from "../dbFunctions/sendPublicMessage";
import getPublicMessages from "../dbFunctions/getPublicMessages";
import StudentPrivateChatSection from "./StudentPrivateChatSection";

function ChatSection({ classData, setShowPrivateChat }) {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState("");

    useEffect(() => {
        if (classData.classCode !== "") {
            const unsubscribe = getPublicMessages(classData.classCode, setChat);

            return unsubscribe;
        }
    }, [classData]);

    const handleSendMessage = (e) => {
        e.preventDefault();

        sendPublicMessage(classData.classCode, message, setMessage);
    };

    return (
        <Container>
            <button
                onClick={() => {
                    setShowPrivateChat(true);
                }}
            >
                Show Private Chat Section
            </button>

            <ChatContainer>
                {chat &&
                    chat.map(({ chatId, chat }) => (
                        <ChatBox
                            key={chatId}
                            chatId={chatId}
                            chatData={chat}
                            classCode={classData?.classCode}
                            isPrivate={false}
                        />
                    ))}
            </ChatContainer>

            <SendMessageContainer>
                <Divider />

                <SendMessageForm onSubmit={handleSendMessage}>
                    <MessageInput
                        placeholder="Send a message"
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        value={message}
                    />

                    <SendButton type="submit">Send</SendButton>
                </SendMessageForm>
            </SendMessageContainer>
        </Container>
    );
}

export default ChatSection;

const Container = styled.div`
    background-color: #00ffbf;
    /* height: 90vh; */
    /* height: 100%; */
    padding: 0.5rem;
    flex: 1;
    /* position: relative; */

    display: flex;
    flex-direction: column;

    @media (max-width: 600px) {
        height: 56vh;
    }
`;

const ChatContainer = styled.div`
    /* height: 80vh; */
    /* flex: 0 0 82vh; */
    flex: 1;
    overflow-y: scroll;

    @media (max-width: 600px) {
        height: 48vh;
    }
`;

const SendMessageContainer = styled.div`
    /* @media (max-width: 600px) {
        flex-direction: column;
        position: fixed;
        width: 88vw;
        bottom: 0;
    } */
`;

const SendMessageForm = styled.form`
    display: flex;
    margin-top: 1rem;
`;

const MessageInput = styled.input`
    padding: 0.5rem;
    margin-right: 0.5rem;
    flex: 1;
    border-radius: 0.5rem;
    border: 0.16rem solid #009150;
    outline: none;
    transition: all 0.2s;

    :hover {
        border: 0.16rem solid #87ffc9;
    }

    :focus {
        border: 0.16rem solid #ffdb59;
    }
`;

const SendButton = styled.button`
    border-radius: 0.5rem;
    border: none;
    padding: 0 0.5rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.6);
    }
`;
