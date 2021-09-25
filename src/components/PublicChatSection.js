import React from "react";
import styled from "styled-components";

function PublicChatSection() {
    return (
        <Section>
            <SectionHeading>Public Chat</SectionHeading>
        </Section>
    );
}

export default PublicChatSection;

const Section = styled.section`
    flex: 1;
    height: 92vh;
    background-color: #e0ff54;
`;

const SectionHeading = styled.h2`
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 0.5rem;
    text-transform: uppercase;
    letter-spacing: calc(1rem / 16);
`;
