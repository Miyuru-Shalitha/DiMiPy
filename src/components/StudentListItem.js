import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FallbackAvatar from "./material-components/FallbackAvatar";
import { getStudentClassCardCord } from "../dbFunctions/getStudentClassCardCord";
import { setStudentClassCardCode } from "../dbFunctions/setStudentClassCardCode";

function StudentListItem({
  studentId,
  username,
  selectedStudentId,
  setSelectedStudentId,
}) {
  const [classCardCode, setClassCardCode] = useState("");

  useEffect(() => {
    getStudentClassCardCord(studentId, setClassCardCode);
  }, [studentId]);

  const handleSubmitClassCardCode = (e) => {
    e.preventDefault();

    setStudentClassCardCode(studentId, classCardCode, setClassCardCode);
  };

  return (
    <Container
      style={
        studentId === selectedStudentId ? { backgroundColor: "#fff" } : null
      }
      onClick={() => {
        setSelectedStudentId(studentId);
      }}
    >
      <FallbackAvatar
        username={username}
        profilePhotoURL="https://lh3.googleusercontent.com/a-/AOh14GjIk7WKI6OgEtqZE1uIXK7r7H7bJNwyEOPmVqLK=s96-c"
      />

      <Name>{username}</Name>

      <form onSubmit={handleSubmitClassCardCode}>
        <ClassCardCode
          type="text"
          placeholder="Class Card Code"
          onChange={(e) => {
            setClassCardCode(e.target.value);
          }}
          value={classCardCode}
        />
      </form>
    </Container>
  );
}

export default StudentListItem;

const Container = styled.div`
  background-color: #aaffaa;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  display: flex;
  align-items: center;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.6);
  }
`;

const Name = styled.h3`
  flex: 1;
`;

const ClassCardCode = styled.input``;
