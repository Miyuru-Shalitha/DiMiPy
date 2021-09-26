import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LessonListItem from "./LessonListItem";
import ClassListItem from "./ClassListItem";
import CreateClassForm from "./CreateClassForm";
import {
    filterCommonClassCode,
    getClassList,
} from "../dbFunctions/handleClassSectionData";
import CreateLessonForm from "./CreateLessonForm";
import { getLessonList } from "../dbFunctions/handleLessonSectionData";
import { db } from "../firebase";
import { handlePublishLesson } from "../dbFunctions/handlePublishLesson";

function ClassSection({
    selectedClassCode,
    setSeletedClassCode,
    selectedLessonId,
    setSelectedLessonId,
}) {
    const [classList, setClassList] = useState([]);
    const [lessonList, setLessonList] = useState([]);

    useEffect(() => {
        getClassList(setClassList);
    }, []);

    useEffect(() => {
        if (selectedClassCode) {
            const commonClassCode = filterCommonClassCode(selectedClassCode);
            getLessonList(commonClassCode, setLessonList);
        }
    }, [selectedClassCode]);

    const handlePublish = () => {
        handlePublishLesson(selectedClassCode, selectedLessonId);
    };

    return (
        <Section>
            <ClassesContainer>
                <SectionHeading>Classes</SectionHeading>

                <ClassListContainer>
                    <ClassList>
                        {classList.map(({ classCode, lessonId }) => (
                            <ClassListItem
                                key={classCode}
                                classCode={classCode}
                                selectedClassCode={selectedClassCode}
                                setSeletedClassCode={setSeletedClassCode}
                            />
                        ))}
                    </ClassList>
                </ClassListContainer>

                <CreateClassForm setClassList={setClassList} />
                {/* <CreateNewClassForm>
                    <label htmlFor="cars">Choose a car:</label>
                    <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    <input type="submit" value="Submit" />
                </CreateNewClassForm> */}
            </ClassesContainer>

            <LessonsContainer>
                <SectionHeading>Lessons</SectionHeading>
                {selectedLessonId && (
                    <PublishButton onClick={handlePublish}>
                        Publish
                    </PublishButton>
                )}

                <LessonListContainer>
                    <LessonList>
                        {lessonList.map(({ lessonId, lessonName }) => (
                            <LessonListItem
                                key={lessonId}
                                lessonId={lessonId}
                                lessonName={lessonName}
                                selectedLessonId={selectedLessonId}
                                setSelectedLessonId={setSelectedLessonId}
                            />
                        ))}
                    </LessonList>
                </LessonListContainer>

                <CreateLessonForm
                    selectedClassCode={selectedClassCode}
                    setLessonList={setLessonList}
                />
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

const ClassListContainer = styled.div`
    flex: 1;
`;

const ClassList = styled.div`
    height: 35vh;
    overflow-y: scroll;
`;

const LessonsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #eb9b34;
    position: relative;
`;

const PublishButton = styled.button`
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;

    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem;
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

const LessonListContainer = styled.div`
    flex: 1;
`;

const LessonList = styled.div`
    height: 30vh;
    overflow-y: scroll;
`;

const CreateNewClassForm = styled.form``;
