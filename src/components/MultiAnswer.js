import React, { useState } from "react";
import styled from "styled-components";

function MultiAnswer({ id, handleClickedAnswer, answerNumber, answer }) {
  const [answerText, setAnswerText] = useState(answer);

  const handleAddAnswerText = (e) => {
    setAnswerText(e.target.value);
  };

  return (
    <label>
      Answers {answerNumber}:
      <AnswerTextarea
        onClick={() => {
          handleClickedAnswer(id);
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
