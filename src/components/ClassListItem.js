import React, { useState } from "react";
import styled from "styled-components";
import { filterCommonClassCode } from "../dbFunctions/handleClassSectionData";
import { getPublishedLesson } from "../dbFunctions/handlePublishLesson";
import { db } from "../firebase";

function ClassListItem({ classCode, selectedClassCode, setSeletedClassCode }) {
    const [lessonName, setLessonName] = useState("");

    const handleClick = () => {
        setSeletedClassCode(classCode);

        getPublishedLesson(classCode, setLessonName);
    };

    return (
        <Container
            style={
                classCode === selectedClassCode
                    ? { backgroundColor: "#fff" }
                    : null
            }
            onClick={handleClick}
        >
            <NameOfClass>{classCode}</NameOfClass>
            {lessonName && (
                <p>
                    <em>Published lesson:</em> {lessonName}
                </p>
            )}
        </Container>
    );
}

export default ClassListItem;

const Container = styled.div`
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: #e0ff54;
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

const NameOfClass = styled.h2``;
