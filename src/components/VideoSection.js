import React from "react";
import styled from "styled-components";

function VideoSection() {
    return (
        <Section>
            <SectionHeading>Videos</SectionHeading>
        </Section>
    );
}

export default VideoSection;

const Section = styled.section`
    flex: 1;
    height: 92vh;
    background-color: #72f542;
`;

const SectionHeading = styled.h2`
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 0.5rem;
    text-transform: uppercase;
    letter-spacing: calc(1rem / 16);
`;
