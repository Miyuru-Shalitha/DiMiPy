import React from "react";
import styled from "styled-components";

function StudentMultiAnswerQuestion({ questionData }) {
  const generateRandomId = () =>
    (new Date().getTime() + Math.random()).toFixed(0);

  return (
    <Container>
      <h2>{questionData?.question}</h2>

      {questionData?.answers.map((answer) => (
        <p key={generateRandomId() + Math.random()}>{answer}</p>
      ))}
    </Container>
  );
}

export default StudentMultiAnswerQuestion;

const Container = styled.div``;
