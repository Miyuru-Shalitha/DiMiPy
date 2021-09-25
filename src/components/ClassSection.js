import React from "react";
import styled from "styled-components";
import LessonListItem from "./LessonListItem";
import ClassListItem from "./ClassListItem";
import CreateItem from "./CreateItem";

function ClassSection() {
    return (
        <Section>
            <ClassesContainer>
                <SectionHeading>Classes</SectionHeading>

                <ClassList>
                    <ClassListItem />
                    <ClassListItem />
                </ClassList>

                <CreateItem />
            </ClassesContainer>

            <LessonsContainer>
                <SectionHeading>Lessons</SectionHeading>

                <LessonList>
                    <LessonListItem />
                    <LessonListItem />
                    <LessonListItem />
                </LessonList>

                <CreateItem />
            </LessonsContainer>
        </Section>
    );
}

export default ClassSection;

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

const ClassesContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #965dd4;
`;

const ClassList = styled.div`
    flex: 1;
`;

const LessonsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #eb9b34;
`;

const LessonList = styled.div`
    flex: 1;
`;
