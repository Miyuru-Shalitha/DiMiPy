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
import StudentQuizZone from "../components/StudentQuizZone";
import ChitSection from "../components/ChitSection";
import YoutubeVideoPlayer from "../components/YoutubeVideoPlayer";

function ClassroomPage() {
  const [classData, setClassData] = useState({
    year: "",
    category: "",
    group: "",
    classCode: "",
    authorized: "",
  });
  const [lessonId, setLessonId] = useState("");
  const [isQuizZoneOn, setIsQuizZoneOn] = useState(false);
  const [isGotoQuizZonePressed, setIsGotoQuizZonePressed] = useState(false);
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
            setClassroomData(
              userClassData.classCode,
              setLessonId,
              setIsQuizZoneOn
            );

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

  const showChatSection = () => {
    if (isGotoQuizZonePressed) {
      return <ChitSection classCode={classData.classCode} />;
    }

    return showPrivateChat ? (
      <StudentPrivateChatSection
        classData={classData}
        setShowPrivateChat={setShowPrivateChat}
      />
    ) : (
      <ChatSection
        classData={classData}
        setShowPrivateChat={setShowPrivateChat}
      />
    );
  };

  return (
    <Container>
      <TitleBar />

      {isQuizZoneOn && !isGotoQuizZonePressed && (
        <GotoQuizZoneBtn
          onClick={() => {
            setIsGotoQuizZonePressed(!isGotoQuizZonePressed);
          }}
        >
          "Go to Quiz Zone"
        </GotoQuizZoneBtn>
      )}

      <BodyContainer>
        {!isGotoQuizZonePressed ? (
          <VideoPlayerContainer>
            {/* <VideoPlayer videos={lessonVideos} /> */}

            <YoutubeVideoPlayer videos={lessonVideos} />

            {/* <h1>{lessonId}</h1> */}
            <h6 style={{ textAlign: "center" }}>
              {classData.year} {classData.category} {classData.group}
            </h6>
          </VideoPlayerContainer>
        ) : (
          <StudentQuizZone classCode={classData.classCode} />
        )}

        {showChatSection()}
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

const GotoQuizZoneBtn = styled.button`
  position: absolute;
  /* top: 1rem;
  left: 1rem; */
  z-index: 1000;

  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #6176ff;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
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
