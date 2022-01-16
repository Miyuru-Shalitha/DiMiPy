import React from "react";
import styled from "styled-components";
import { db } from "../firebase";

function ChitItem({ id, classCode, chit, isAdmin }) {
  const handleDelete = () => {
    db.collection("classes")
      .doc(classCode)
      .collection("chits")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Deleted");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <p>{chit}</p>
      {!isAdmin && <DeleteButton onClick={handleDelete}>X</DeleteButton>}
    </Container>
  );
}

export default ChitItem;

const Container = styled.div`
  padding: 0.5rem;
  background-color: #8ffffb;
  margin: 0.3rem;
  border-radius: 0.3rem;

  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  padding: 0.1rem;
`;
