import React, { useState } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { db } from "../firebase";
import StudentBinaryAnswersQuestion from "./StudentBinaryAnswersQuestion";
import StudentMultiAnswerQuestion from "./StudentMultiAnswerQuestion";
import LogoCircles from "../assets/logo-circles.svg";
import LogoRoundedText from "../assets/logo-rounded-text.svg";

function StudentQuizZone({ classCode }) {
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("classes")
      .doc(classCode)
      .collection("quizZone")
      .doc("questionData")
      .onSnapshot((docSnapshot) => {
        if (docSnapshot.exists) {
          setQuestionData(docSnapshot.data());
        }
      });

    return unsubscribe;
  }, []);

  return (
    <StudentQuizZoneContainer>
      {/* {questionData?.questionType === "multi-answers" ? (
        <StudentMultiAnswerQuestion
          classCode={classCode}
          questionData={questionData}
        />
      ) : (
        <StudentBinaryAnswersQuestion questionData={questionData} />
      )} */}
      {questionData === null || questionData?.question === null ? (
        <LoadingContainer>
          <ImagesContainer>
            <LoadingImageCircle src={LogoCircles} alt="loading" />
            <LoadingImageRoundedText src={LogoRoundedText} alt="loading" />
          </ImagesContainer>
        </LoadingContainer>
      ) : (
        <StudentMultiAnswerQuestion
          classCode={classCode}
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      )}
    </StudentQuizZoneContainer>
  );
}

export default StudentQuizZone;

const StudentQuizZoneContainer = styled.div`
  flex: 3;
  /* max-height: 30vh; */
  overflow-y: auto;
`;

const LoadingContainer = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  /* align-items: center; */
`;

const ImagesContainer = styled.div`
  flex: 0 0 20rem;
  height: 20rem;

  position: relative;
`;

const LoadingImageCircle = styled.img`
  width: 20rem;
  height: 20rem;

  position: absolute;
  top: 0;
  left: 0;
`;

const LoadingAnimation = keyframes`
from {
  transform: rotate(0);
}
to {
  transform: rotate(360deg);
}
`;

const LoadingImageRoundedText = styled.img`
  width: 20rem;
  height: 20rem;

  position: absolute;
  top: 0;
  left: 0;

  animation: ${LoadingAnimation} 5s linear infinite;
`;
