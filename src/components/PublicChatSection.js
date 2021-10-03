import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getPublicMessages from "../dbFunctions/getPublicMessages";
import ChatBox from "./ChatBox";
import SendPublicMessageForm from "./SendPublicMessageForm";

function PublicChatSection({ selectedClassCode }) {
    const [chat, setChat] = useState([]);

    useEffect(() => {
        if (selectedClassCode) {
            const unsubscribe = getPublicMessages(selectedClassCode, setChat);

            return unsubscribe;
        }
    }, [selectedClassCode]);

    return (
        <Section>
            <SectionHeading>Public Chat</SectionHeading>

            <ChatListContainer>
                <ChatList>
                    {chat.map(({ chatId, chat }) => (
                        <ChatBox
                            key={chatId}
                            chatId={chatId}
                            chatData={chat}
                            classCode={selectedClassCode}
                            isPrivate={false}
                        />
                    ))}
                </ChatList>
            </ChatListContainer>

            <SendPublicMessageForm selectedClassCode={selectedClassCode} />
        </Section>
    );
}

export default PublicChatSection;

const Section = styled.section`
    flex: 1;
    height: 92vh;
    background-color: #e0ff54;
    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
`;

const SectionHeading = styled.h2`
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 0.5rem;
    text-transform: uppercase;
    letter-spacing: calc(1rem / 16);
`;

const ChatListContainer = styled.div`
    flex: 1;
    overflow-y: scroll;

    display: flex;
    flex-direction: column-reverse;
`;

const ChatList = styled.div``;
