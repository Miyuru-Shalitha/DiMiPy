import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getPrivateMessages from "../dbFunctions/getPrivateMessages";
import { handleStudentsSectionData } from "../dbFunctions/handleStudentsSectionData";
import ChatBox from "./ChatBox";
import SendPrivateMessageForm from "./SendPrivateMessageForm";
import StudentListItem from "./StudentListItem";

function PrivateChatSection({ selectedClassCode }) {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [chat, setChat] = useState();

  useEffect(() => {
    if (selectedClassCode) {
      handleStudentsSectionData(selectedClassCode, setStudents);
    }
  }, [selectedClassCode]);

  useEffect(() => {
    if (selectedStudentId) {
      const unsubscribe = getPrivateMessages(selectedStudentId, setChat, true);

      return unsubscribe;
    }
  }, [selectedStudentId]);

  // useEffect(() => {
  //     if (classData.classCode !== "") {
  //         const unsubscribe = getPrivateMessages(
  //             auth.currentUser.uid,
  //             classData.classCode,
  //             setChat
  //         );

  //         return unsubscribe;
  //     }
  // }, [classData]);

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
          <ChatList>
            {chat &&
              chat.map(({ chatId, chat }) => (
                <ChatBox
                  key={chatId}
                  chatId={chatId}
                  chatData={chat}
                  classCode={selectedClassCode}
                  studentId={selectedStudentId}
                  isPrivate={true}
                />
              ))}
          </ChatList>
        </ChatListContainer>

        <SendPrivateMessageForm selectedStudentId={selectedStudentId} />
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
  height: 35vh;
  overflow-y: auto;
`;

const ChatSection = styled.section`
  flex: 1;
  background-color: #5473ff;

  display: flex;
  flex-direction: column;

  /* TEST */
  @media only screen and (max-width: 900px) {
    font-size: 2rem;
  }
`;

const ChatListContainer = styled.div`
  flex: 1;
`;

const ChatList = styled.div`
  height: 37vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column-reverse;
`;
