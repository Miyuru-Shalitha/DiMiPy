import React from "react";
import styled from "styled-components";
import TitleBar from "../components/TitleBar";

function AdminPage() {
    return (
        <Container>
            <TitleBar />

            <BodyContainer>
                <LessonSection>
                    <SectionHeading>Lessons</SectionHeading>
                </LessonSection>

                <VideoSection>
                    <SectionHeading>Videos</SectionHeading>
                </VideoSection>

                <PrivateChatSection>
                    <StudentSection>
                        <SectionHeading>Students</SectionHeading>
                    </StudentSection>
                    <ChatSection>
                        <SectionHeading>Private Chat</SectionHeading>
                    </ChatSection>
                </PrivateChatSection>

                <PublicChatSection>
                    <SectionHeading>Public Chat</SectionHeading>
                </PublicChatSection>
            </BodyContainer>
        </Container>
    );
}

export default AdminPage;

const Container = styled.div``;

const BodyContainer = styled.div`
    display: flex;
`;

// const Section = styled.section`
//     flex: 1;
//     height: 92vh;
//     background-color: orange;
// `;

const SectionHeading = styled.h2`
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 0.5rem;
    text-transform: uppercase;
    letter-spacing: calc(1rem / 16);
`;

const LessonSection = styled.section`
    flex: 1;
    height: 92vh;
    background-color: orange;
`;

const VideoSection = styled.section`
    flex: 1;
    height: 92vh;
    background-color: #72f542;
`;

const PrivateChatSection = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 92vh;
`;

const StudentSection = styled.section`
    flex: 1;
    background-color: #42f5d4;
`;

const ChatSection = styled.section`
    flex: 1;
    background-color: #5473ff;
`;

const PublicChatSection = styled.section`
    flex: 1;
    height: 92vh;
    background-color: #e0ff54;
`;
