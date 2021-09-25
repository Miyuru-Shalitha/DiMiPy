import React from "react";
import styled from "styled-components";
import LessonListItem from "./LessonListItem";

function LessonSection() {
    return (
        <Section>
            <SectionHeading>Lessons</SectionHeading>

            <Lessons>
                <LessonListItem />
                <LessonListItem />
                <LessonListItem />
            </Lessons>
        </Section>
    );
}

export default LessonSection;

const Section = styled.section`
    flex: 1;
    height: 92vh;
    background-color: orange;
`;

const SectionHeading = styled.h2`
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 0.5rem;
    text-transform: uppercase;
    letter-spacing: calc(1rem / 16);
`;

const Lessons = styled.div``;
