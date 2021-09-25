import React from "react";
import styled from "styled-components";

function PrivateChatSection() {
    return (
        <Section>
            <StudentSection>
                <SectionHeading>Students</SectionHeading>
            </StudentSection>
            <ChatSection>
                <SectionHeading>Private Chat</SectionHeading>
            </ChatSection>
        </Section>
    );
}

export default PrivateChatSection;

const Section = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 92vh;
`;

const SectionHeading = styled.h2`
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 0.5rem;
    text-transform: uppercase;
    letter-spacing: calc(1rem / 16);
`;

const StudentSection = styled.section`
    flex: 1;
    background-color: #42f5d4;
`;

const ChatSection = styled.section`
    flex: 1;
    background-color: #5473ff;
`;
