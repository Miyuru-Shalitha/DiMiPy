import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultiAnswer from "./MultiAnswer";
import { db } from "../firebase";

function QuizZone({ isLive, setIsLive, selectedClassCode }) {
  const [answerType, setAnswerType] = useState("multi-answers");
  const [questionText, setQuestionText] = useState("Empty");
  const [multiAnswers, setMultiAnswers] = useState([
    { id: 1, answer: "Empty" },
  ]);
  const [clickedAnswerId, setClickedAnswerId] = useState(null);

  useEffect(() => {
    db.collection("classes").doc(selectedClassCode).set(
      {
        isQuizZoneOn: true,
      },
      { merge: true }
    );
  }, []);

  const handleGoOffline = () => {
    db.collection("classes").doc(selectedClassCode).set(
      {
        isQuizZoneOn: false,
      },
      { merge: true }
    );

    setIsLive(false);
  };

  const handleSelect = (e) => {
    setAnswerType(e.target.value);
  };

  const addAnswer = () => {
    setMultiAnswers((prevValue) => [
      ...prevValue,
      { id: generateRandomId(), answer: "Empty" },
    ]);
  };

  const generateRandomId = () =>
    (new Date().getTime() + Math.random()).toFixed(0);

  const handleClickedAnswer = (i) => {
    setClickedAnswerId(i);
  };

  const removeAnswer = () => {
    if (clickedAnswerId) {
      setMultiAnswers((prevValue) =>
        prevValue.filter((value) => value.id !== clickedAnswerId)
      );

      setClickedAnswerId(null);
    }
  };

  const handleAsk = (e) => {
    e.preventDefault();

    db.collection("classes")
      .doc(selectedClassCode)
      .collection("quizZone")
      .doc("questionData")
      .set(
        {
          question: questionText,
          answers: multiAnswers,
        },
        { merge: true }
      );
  };

  return (
    <div>
      <QuizZoneHeader>
        <QuitButton onClick={handleGoOffline}>Quit</QuitButton>
        <QuizZoneHeaderText>QUIZ ZONE</QuizZoneHeaderText>
      </QuizZoneHeader>

      <QuizZoneBody>
        <Chits></Chits>

        <Question onSubmit={handleAsk}>
          <QuestionText>
            <label>
              Question:
              <QuestionTextarea
                onChange={(e) => {
                  setQuestionText(e.target.value);
                }}
                value={questionText}
              />
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
                {multiAnswers.map(({ answer, id }, i) => (
                  <MultiAnswer
                    key={id}
                    id={id}
                    handleClickedAnswer={handleClickedAnswer}
                    answerNumber={i + 1}
                    answer={answer}
                  />
                ))}

                <AddRemoveButton type="button" onClick={addAnswer}>
                  +
                </AddRemoveButton>
                <AddRemoveButton type="button" onClick={removeAnswer}>
                  -
                </AddRemoveButton>
              </MultiAnswers>
            ) : (
              <BinaryAnswers>BINARYANSWERS</BinaryAnswers>
            )}
          </Answers>

          <button type="submit">Ask</button>
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

const Question = styled.form`
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
