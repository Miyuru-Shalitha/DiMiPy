import React, { useState } from "react";
import styled from "styled-components";
import { filterCommonClassCode } from "../dbFunctions/handleClassSectionData";
import { handleLessonSectionData } from "../dbFunctions/handleLessonSectionData";

function CreateLessonForm({ selectedClassCode, setLessonList }) {
    const [newLessonName, setNewLessonName] = useState("");

    const submit = (e) => {
        e.preventDefault();

        if (selectedClassCode) {
            const commonClassCode = filterCommonClassCode(selectedClassCode);
            handleLessonSectionData(
                commonClassCode,
                newLessonName,
                setLessonList
            );

            setNewLessonName(""); // Reset input text.
        } else {
            alert("Please select a class");
        }
    };

    return (
        <Container onSubmit={submit}>
            <TextInput
                type="text"
                placeholder="Create New Lesson"
                onChange={(e) => {
                    setNewLessonName(e.target.value);
                }}
                value={newLessonName}
            />
            <CreateButton type="submit">Create</CreateButton>
        </Container>
    );
}

export default CreateLessonForm;

const Container = styled.form`
    padding: 0.5rem;
    display: flex;
`;

const TextInput = styled.input`
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    border: none;
`;

const CreateButton = styled.button`
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
