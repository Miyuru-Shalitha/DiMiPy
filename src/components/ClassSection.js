import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LessonListItem from "./LessonListItem";
import ClassListItem from "./ClassListItem";
import CreateItem from "./CreateItem";
import CreateClassForm from "./CreateClassForm";
import { getClassList } from "../dbFunctions/handleClassSectionData";

function ClassSection() {
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        getClassList(setClassList);
    }, []);

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
`;

const LessonList = styled.div`
    flex: 1;
`;

const CreateNewClassForm = styled.form``;
