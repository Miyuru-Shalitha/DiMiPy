import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import TitleBar from "../components/TitleBar";
import VideoPlayer from "../components/VideoPlayer";
import { setClassroomData } from "../dbFunctions/setClassroomData";
import { getUserClassroomData } from "../dbFunctions/getUserClassroomData";
import { auth, db } from "../firebase";
import { getLesson } from "../dbFunctions/getLesson";
import StudentPrivateChatSection from "../components/StudentPrivateChatSection";
import { useHistory } from "react-router";
import { ROOT_ROUTE } from "../constants/routes";
import { USERS } from "../constants/dbConsts";

function ClassroomPage() {
  const [classData, setClassData] = useState({
    year: "",
    category: "",
    group: "",
    classCode: "",
    authorized: "",
  });
  const [lessonId, setLessonId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonVideos, setLessonVideos] = useState([]);
  const [showPrivateChat, setShowPrivateChat] = useState(false);

  const history = useHistory("");

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     getUserClassroomData(auth.currentUser.uid)
  //       .then((userClassData) => {
  //         setClassData({
  //           year: userClassData.year,
  //           category: userClassData.category,
  //           group: userClassData.group,
  //         });

  //         getClassroomData(userClassData.classCode)
  //           .then((classData) => {
  //             setLessonId(classData.lessonId);
  //           })
  //           .catch((err) => {
  //             alert(err.message);
  //           });
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //       });
  //   }
  // }, [auth.currentUser]);

  useEffect(() => {}, []);

  useEffect(() => {
    const currUser = auth.currentUser;

    if (currUser) {
      getUserClassroomData(currUser.uid)
        .then((userClassData) => {
          setClassData({
            year: userClassData.year,
            category: userClassData.category,
            group: userClassData.group,
            classCode: userClassData.classCode,
            authorized: userClassData.authorized,
          });

          if (userClassData.authorized === false) {
            // userClassData.authorized could be null.
            history.push(ROOT_ROUTE);
          } else if (userClassData.authorized) {
            setClassroomData(userClassData.classCode, setLessonId);

            db.collection(USERS)
              .doc(currUser.uid)
              .update({
                authorized: false,
              })
              .catch((err) => {
                alert(err.message);
              });
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (auth.currentUser && classData.classCode.length > 0) {
      const unsubscribe = getLesson(
        classData.classCode,
        setLessonTitle,
        setLessonVideos
      );

      return unsubscribe;
    }
  }, [lessonId]);

  return (
    <Container>
      <TitleBar />

      <BodyContainer>
        <VideoPlayerContainer>
          <VideoPlayer videos={lessonVideos} />
          {/* <h1>{lessonId}</h1> */}
          <h6 style={{ textAlign: "center" }}>
            {classData.year} {classData.category} {classData.group}
          </h6>
        </VideoPlayerContainer>

        {showPrivateChat ? (
          <StudentPrivateChatSection
            classData={classData}
            setShowPrivateChat={setShowPrivateChat}
          />
        ) : (
          <ChatSection
            classData={classData}
            setShowPrivateChat={setShowPrivateChat}
          />
        )}
      </BodyContainer>
    </Container>
  );
}

export default ClassroomPage;

const Container = styled.div`
  /* overflow: hidden; */
  @media (max-width: 600px) {
    overflow: hidden;
  }
`;

const BodyContainer = styled.div`
  display: flex;
  /* height: 100%; */
  height: 92vh;

  position: relative;

  /* TEST */
  /* @media only screen and (max-width: 900px) {
    font-size: 2rem;
  } */

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const VideoPlayerContainer = styled.div`
  flex: 3;
`;

const ChatSectionContainer = styled.div`
  flex: 1;
`;
