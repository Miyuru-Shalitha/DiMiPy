import React, { useState } from "react";
import styled from "styled-components";

function MultiAnswer({ handleClickedAnswer, answerId }) {
  const [answerText, setAnswerText] = useState("Empty");

  const handleAddAnswerText = (e) => {
    setAnswerText(e.target.value);
  };

  return (
    <label>
      Answers {answerId + 1}:
      <AnswerTextarea
        onClick={() => {
          handleClickedAnswer(answerId);
        }}
        onChange={handleAddAnswerText}
        value={answerText}
      />
    </label>
  );
}

export default MultiAnswer;

const AnswerTextarea = styled.textarea`
  width: 100%;
  border: none;
`;
