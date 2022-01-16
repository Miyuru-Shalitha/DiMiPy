import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

function StudentMultiAnswerQuestion({
  classCode,
  questionData,
  setQuestionData,
}) {
  useEffect(() => {
    db.collection("classes")
      .doc(classCode)
      .collection("quizZone")
      .doc("answeredUsers")
      .get()
      .then((data) => {
        if (data.exists) {
          if (data.data().ids.includes(auth.currentUser.uid)) {
            setQuestionData(null);
          }
        }
      });
  }, []);

  const generateRandomId = () =>
    (new Date().getTime() + Math.random()).toFixed(0);

  const handleClickAnswer = (answerId) => {
    const questionDataRef = db
      .collection("classes")
      .doc(classCode)
      .collection("quizZone");

    questionDataRef
      .doc("questionData")
      .get()
      .then((data) => {
        const answersCount = data.data().answersCount;

        if (answersCount !== undefined) {
          answersCount[answerId]++;

          questionDataRef
            .doc("questionData")
            .set(
              {
                answersCount: answersCount,
              },
              { merge: true }
            )
            .then(() => {
              questionDataRef
                .doc("answeredUsers")
                .get()
                .then((data) => {
                  const answeredUsersData = data.data();
                  let answeredUserIds = [];

                  if (answeredUsersData === undefined) {
                    answeredUserIds = [];
                  } else {
                    answeredUserIds = answeredUsersData.ids;
                  }

                  answeredUserIds.push(auth.currentUser.uid);

                  questionDataRef
                    .doc("answeredUsers")
                    .set({ ids: answeredUserIds })
                    .then(() => {
                      setQuestionData(null);
                      console.log("Answer submitted");
                    });
                });
            })
            .catch((err) => {
              alert(err.message);
            });
        } else {
          const tempAnswersCount = [];

          for (let i = 0; i < questionData.answers.length; i++) {
            if (i === answerId) {
              tempAnswersCount.push(1);
            } else {
              tempAnswersCount.push(0);
            }
          }

          questionDataRef
            .doc("questionData")
            .set(
              {
                answersCount: tempAnswersCount,
              },
              { merge: true }
            )
            .then(() => {
              questionDataRef
                .doc("answeredUsers")
                .get()
                .then((data) => {
                  const answeredUsersData = data.data();
                  let answeredUserIds = [];

                  if (answeredUsersData === undefined) {
                    answeredUserIds = [];
                  } else {
                    answeredUserIds = answeredUsersData.ids;
                  }

                  answeredUserIds.push(auth.currentUser.uid);

                  questionDataRef
                    .doc("answeredUsers")
                    .set({ ids: answeredUserIds })
                    .then(() => {
                      setQuestionData(null);
                      console.log("Answer submitted");
                    });
                });
            })
            .catch((err) => {
              alert(err.message);
            });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <Question>{questionData?.question}</Question>

      {questionData?.answers.map((answer, i) => (
        <Answer
          key={generateRandomId() + Math.random()}
          onClick={() => {
            handleClickAnswer(i);
          }}
        >
          <BoldSpan>({i + 1})</BoldSpan> {answer}
        </Answer>
      ))}
    </Container>
  );
}

export default StudentMultiAnswerQuestion;

const Container = styled.div``;

const Question = styled.p`
  font-size: 2rem;
  font-weight: bold;
  background-color: aqua;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.5rem rgba(10, 10, 10, 0.5);
  color: #0035ba;
`;

const Answer = styled.p`
  background-color: #fca80a;
  color: #996300;
  margin: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.5rem rgba(10, 10, 10, 0.5);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ffc354;
  }

  &:active {
    background-color: #ffd78c;
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
  /* font-style: italic; */
`;
