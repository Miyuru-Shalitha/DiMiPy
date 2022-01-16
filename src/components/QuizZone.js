import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultiAnswer from "./MultiAnswer";
import { db } from "../firebase";
import Graph from "./Graph";

function QuizZone({ isLive, setIsLive, selectedClassCode }) {
  const [answerType, setAnswerType] = useState("multi-answers");
  const [questionText, setQuestionText] = useState("Empty");
  const [multiAnswers, setMultiAnswers] = useState([
    { id: 1, answer: "Empty" },
  ]);
  const [multiAnswerTexts, setMultiAnswerTexts] = useState([]);
  const [clickedAnswerId, setClickedAnswerId] = useState(null);
  const [answersCount, setAnswersCount] = useState(null);
  const [asked, setAsked] = useState(false);
  const [showBinaryAskAnswersBtns, setShowBinaryAskAnswersBtns] =
    useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection("classes")
      .doc(selectedClassCode)
      .collection("quizZone")
      .doc("questionData")
      .onSnapshot((docSnapshot) => {
        if (docSnapshot.exists) {
          setAnswersCount(docSnapshot.data().answersCount);
        }
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection("classes").doc(selectedClassCode).set(
      {
        isQuizZoneOn: true,
      },
      { merge: true }
    );

    return unsubscribe;
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

    if (e.target.value === "multi-answers") {
      setShowBinaryAskAnswersBtns(false);
    } else if (e.target.value === "binary") {
      setShowBinaryAskAnswersBtns(true);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!asked) {
      askQuestion(0);
    } else {
      clearQuestion();
    }
  };

  const askQuestion = (answerTypeInt) => {
    // 0 -> multi-answers
    // 1 -> understand
    // 2 -> Yes/No

    setAsked(true);

    const questionDataRef = db
      .collection("classes")
      .doc(selectedClassCode)
      .collection("quizZone")
      .doc("questionData");

    if (answerTypeInt === 0) {
      const multiAnswersElements =
        document.getElementsByClassName("multi-answer");

      const multiAnswersTextArray = [];

      for (let i = 0; i < multiAnswersElements.length; i++) {
        multiAnswersTextArray.push(multiAnswersElements[i].value);
      }

      questionDataRef.set(
        {
          questionType: answerType,
          question: questionText,
          answers: multiAnswersTextArray,
        },
        { merge: true }
      );
    } else if (answerTypeInt === 1) {
      questionDataRef.set({
        questionType: answerType,
        question: questionText,
        answers: ["Understood", "Did not understand"],
      });
    } else if (answerTypeInt === 2) {
      questionDataRef.set({
        questionType: answerType,
        question: questionText,
        answers: ["Yes", "No"],
      });
    }
  };

  const clearQuestion = () => {
    setAsked(false);

    const quizZoneRef = db
      .collection("classes")
      .doc(selectedClassCode)
      .collection("quizZone");

    quizZoneRef
      .doc("answeredUsers")
      .delete()
      .then(() => {
        console.log("Reset answered user ids");
      })
      .catch((err) => {
        console.log(err.message);
      });

    quizZoneRef.doc("questionData").set({
      questionType: null,
      question: null,
      answers: [],
    });
  };

  const handleUnderstandBtn = () => {
    setQuestionText("Understand?");

    askQuestion(1);
  };

  const handleYesNoBtn = () => {
    askQuestion(2);
  };

  const handleOpenResultsInNewTab = () => {
    const newWindow = window.open(
      `/results/${answersCount}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div>
      <QuizZoneHeader>
        <QuitButton onClick={handleGoOffline}>Quit</QuitButton>
        <QuizZoneHeaderText>QUIZ ZONE</QuizZoneHeaderText>
      </QuizZoneHeader>

      <QuizZoneBody>
        <GraphContainer>
          <Graph data={answersCount} graphSize="medium" />
          <button onClick={handleOpenResultsInNewTab}>Open</button>
        </GraphContainer>

        <Question onSubmit={handleSubmit}>
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
              <BinaryAnswers>
                {!asked && (
                  <>
                    <button type="button" onClick={handleUnderstandBtn}>
                      Understand?
                    </button>
                    <button type="button" onClick={handleYesNoBtn}>
                      Yes/No
                    </button>
                  </>
                )}
              </BinaryAnswers>
            )}
          </Answers>

          {(answerType === "multi-answers" || asked) && (
            <button type="submit">{asked ? "Clear" : "Ask"}</button>
          )}
        </Question>
      </QuizZoneBody>

      <h2>{answersCount}</h2>
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

const GraphContainer = styled.div`
  /* height: 30vh; */
  padding: 1rem;
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
