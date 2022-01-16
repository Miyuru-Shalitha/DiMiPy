import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import ChitItem from "./ChitItem";

function ChitSection({ classCode }) {
  const [chit, setChit] = useState("");
  const [allChits, setAllChits] = useState([]);
  const [currentUserChits, setCurrentUserChits] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("classes")
      .doc(classCode)
      .collection("chits")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setAllChits(
          snapshot.docs.map((doc) => ({
            chitId: doc.id,
            chit: doc.data(),
          }))
        );
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setCurrentUserChits(
      allChits.filter(
        (chitItem) => auth.currentUser.uid === chitItem.chit.userId
      )
    );
  }, [allChits]);

  const handleSendChit = (e) => {
    e.preventDefault();

    db.collection("classes")
      .doc(classCode)
      .collection("chits")
      .add({
        userId: auth.currentUser.uid,
        chit: chit,
        timestamp: new Date().getTime(),
      })
      .then(() => {
        setChit("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <ChatContainer>
        {currentUserChits?.map(({ chitId, chit }) => (
          <ChitItem
            key={chitId}
            id={chitId}
            classCode={classCode}
            chit={chit.chit}
            isAdmin={false}
          />
        ))}
      </ChatContainer>

      <SendMessageContainer>
        <Divider />

        <SendMessageForm onSubmit={handleSendChit}>
          <MessageInput
            placeholder="Send a chit"
            onChange={(e) => {
              setChit(e.target.value);
            }}
            value={chit}
          />

          <SendButton type="submit">Send</SendButton>
        </SendMessageForm>
      </SendMessageContainer>
    </Container>
  );
}

export default ChitSection;
const Container = styled.div`
  background-color: #00a6a0;
  padding: 0.5rem;
  flex: 1;

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 37.5em) {
    /* 600px */
    /* height: 56vh; */
    flex: 0 0 60vh;
  }
`;

const ChatContainer = styled.div`
  /* height: 80vh; */
  /* flex: 0 0 82vh; */
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column-reverse;

  @media only screen and (max-width: 37.5em) {
    /* 600px */
    /* height: 48vh; */
    flex: 0 0 43vh;
  }
`;

const SendMessageContainer = styled.div`
  /* @media (max-width: 600px) {
        flex-direction: column;
        position: fixed;
        width: 88vw;
        bottom: 0;
    } */
`;

const SendMessageForm = styled.form`
  display: flex;
  margin-top: 1rem;
`;

const MessageInput = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  flex: 1;
  border-radius: 0.5rem;
  border: 0.16rem solid #009150;
  outline: none;
  transition: all 0.2s;

  :hover {
    border: 0.16rem solid #87ffc9;
  }

  :focus {
    border: 0.16rem solid #ffdb59;
  }
`;

const SendButton = styled.button`
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
