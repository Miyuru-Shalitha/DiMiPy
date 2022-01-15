import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import StudentBinaryAnswersQuestion from "./StudentBinaryAnswersQuestion";
import StudentMultiAnswerQuestion from "./StudentMultiAnswerQuestion";

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
      {questionData?.questionType === "multi-answers" ? (
        <StudentMultiAnswerQuestion
          classCode={classCode}
          questionData={questionData}
        />
      ) : (
        <StudentBinaryAnswersQuestion questionData={questionData} />
      )}
    </StudentQuizZoneContainer>
  );
}

export default StudentQuizZone;

const StudentQuizZoneContainer = styled.div`
  flex: 3;
`;
