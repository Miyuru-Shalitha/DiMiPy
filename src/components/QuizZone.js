import React, { useState } from "react";
import styled from "styled-components";

function QuizZone({ setIsLive }) {
  const [answerType, setAnswerType] = useState("multi-answers");
  const [multiAnswers, setMultiAnswers] = useState(["Empty"]);
  const [clickedAnswer, setClickedAnswer] = useState(null);

  const handleGoLive = () => {
    setIsLive(false);
  };

  const handleSelect = (e) => {
    setAnswerType(e.target.value);
  };

  const addAnswer = () => {
    setMultiAnswers((prevValue) => [...prevValue, "Empty"]);
  };

  const handleClickedAnswer = (i) => {
    setClickedAnswer(i);
  };

  const removeAnswer = () => {
    if (clickedAnswer) {
      const answersList = multiAnswers;
      answersList.splice(clickedAnswer, 1);

      setMultiAnswers(answersList);
      setClickedAnswer(null);
    }
  };

  return (
    <div>
      <QuizZoneHeader>
        <QuitButton onClick={handleGoLive}>Quit</QuitButton>
        <QuizZoneHeaderText>QUIZ ZONE</QuizZoneHeaderText>
      </QuizZoneHeader>

      <QuizZoneBody>
        <Chits></Chits>

        <Question>
          <QuestionText>
            <label>
              Question:
              <QuestionTextarea defaultValue="Empty" />
            </label>
          </QuestionText>

          <Answers>
            <AnswerTypes>
              <label>
                Answer Type:
                <select value={answerType} onChange={handleSelect}>
                  <option value="multi-answers">Multi-Answers</option>
                  <option value="binary">Binary</option>
                </select>
              </label>
            </AnswerTypes>

            {answerType === "multi-answers" ? (
              <MultiAnswers>
                {multiAnswers.map((answer, i) => (
                  <label key={i}>
                    Answers {i + 1}:
                    <AnswerTextarea
                      onClick={() => {
                        handleClickedAnswer(i);
                      }}
                      defaultValue={answer}
                    />
                  </label>
                ))}

                <AddRemoveButton onClick={addAnswer}>+</AddRemoveButton>
                <AddRemoveButton onClick={removeAnswer}>-</AddRemoveButton>
              </MultiAnswers>
            ) : (
              <BinaryAnswers>BINARYANSWERS</BinaryAnswers>
            )}
          </Answers>
        </Question>
      </QuizZoneBody>
    </div>
  );
}

export default QuizZone;

const QuizZoneHeader = styled.div`
  padding: 0.5rem;
  background-color: #34eb9e;
  position: relative;
  display: flex;
`;

const QuizZoneHeaderText = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const QuitButton = styled.button`
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  background-color: #6176ff;
  color: #fff;
  text-transform: uppercase;
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

const QuizZoneBody = styled.div`
  background-color: #ffff00;
  /* height: 50vh; */
  padding: 1rem;
`;

const Chits = styled.div`
  height: 30vh;
  background-color: aqua;
  margin-bottom: 1rem;
`;

const Question = styled.div`
  background-color: aqua;
  padding: 1rem;
`;

const QuestionText = styled.div`
  margin-bottom: 1rem;
`;

const QuestionTextarea = styled.textarea`
  width: 100%;
  border: none;
`;

const AnswerTextarea = styled.textarea`
  width: 100%;
  border: none;
`;

const AnswerTypes = styled.div`
  margin-bottom: 1rem;
`;

const Answers = styled.div``;

const MultiAnswers = styled.div``;

const AddRemoveButton = styled.button`
  width: 2rem;

  /* &:not(:last-child) {
    margin-right: 0.2rem;
  } */
`;

const BinaryAnswers = styled.div``;
