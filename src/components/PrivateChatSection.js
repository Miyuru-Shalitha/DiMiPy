import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { handleStudentsSectionData } from "../dbFunctions/handleStudentsSectionData";
import ChatBox from "./ChatBox";
import StudentListItem from "./StudentListItem";

function PrivateChatSection({ selectedClassCode }) {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        if (selectedClassCode) {
            handleStudentsSectionData(selectedClassCode, setStudents);
        }
    }, [selectedClassCode]);

    return (
        <Section>
            <StudentSection>
                <SectionHeading>Students</SectionHeading>

                <StudentListItemContainer>
                    {students.map(({ studentId, studentData }) => (
                        <StudentListItem
                            key={studentId}
                            studentId={studentId}
                            username={studentData.username}
                            selectedStudentId={selectedStudentId}
                            setSelectedStudentId={setSelectedStudentId}
                        />
                    ))}
                </StudentListItemContainer>
            </StudentSection>

            <ChatSection>
                <SectionHeading>Private Chat</SectionHeading>

                <ChatListContainer>
                    {/* <ChatBox /> */}
                    <h1>Chat</h1>
                    <h1>Chat</h1>
                    <h1>Chat</h1>
                    <h1>Chat</h1>
                    <h1>Chat</h1>
                    <h1>Chat</h1>
                </ChatListContainer>
            </ChatSection>
        </Section>
    );
}

export default PrivateChatSection;

const Section = styled.section`
    flex: 1;

    display: flex;
    flex-direction: column;
    /* height: 92vh; */
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
    /* flex: 0 0 40vh; */
    background-color: #42f5d4;
`;

const StudentListItemContainer = styled.div`
    height: 40vh;
    overflow-y: scroll;
`;

const ChatSection = styled.section`
    flex: 1;
    background-color: #5473ff;
`;

const ChatListContainer = styled.div``;
