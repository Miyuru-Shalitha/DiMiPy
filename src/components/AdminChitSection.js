import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getPublicMessages from "../dbFunctions/getPublicMessages";
import ChatBox from "./ChatBox";
import SendPublicMessageForm from "./SendPublicMessageForm";
import { db } from "../firebase";
import ChitItem from "./ChitItem";

function AdminChitSection({ selectedClassCode }) {
  const [chits, setChits] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("classes")
      .doc(selectedClassCode)
      .collection("chits")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setChits(
          snapshot.docs.map((doc) => ({
            chitId: doc.id,
            chit: doc.data(),
          }))
        );
      });

    return unsubscribe;
  }, [selectedClassCode]);

  return (
    <Section>
      <SectionHeading>Chits</SectionHeading>

      <ChatListContainer>
        <ChitList>
          {chits?.map(({ chitId, chit }) => (
            <ChitItem
              key={chitId}
              id={chitId}
              classCode={selectedClassCode}
              chit={chit.chit}
              isAdmin={true}
            />
          ))}
        </ChitList>
      </ChatListContainer>
    </Section>
  );
}

export default AdminChitSection;

const Section = styled.section`
  flex: 1;
  height: 92vh;
  background-color: #e0ff54;
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
`;

const SectionHeading = styled.h2`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 0.5rem;
  text-transform: uppercase;
  letter-spacing: calc(1rem / 16);
`;

const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column-reverse;

  /* TEST */
  @media only screen and (max-width: 56.25em) {
    /* 900px */
    font-size: 2rem;
  }
`;

const ChitList = styled.div``;
