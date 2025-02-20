import React from "react";
import styled from "styled-components";

function LessonListItem({
    lessonId,
    lessonName,
    selectedLessonId,
    setSelectedLessonId,
}) {
    return (
        <Container
            style={
                lessonId === selectedLessonId
                    ? { backgroundColor: "#fff" }
                    : null
            }
            onClick={() => {
                setSelectedLessonId(lessonId);
            }}
        >
            <LessonTitle>{lessonName}</LessonTitle>
        </Container>
    );
}

export default LessonListItem;

const Container = styled.div`
    flex: 1;
    margin: 0.5rem;
    padding: 0.5rem;
    background-color: #34c9eb;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.6);
    }
`;

const LessonTitle = styled.h2``;
