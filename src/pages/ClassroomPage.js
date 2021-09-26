import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import LogoutButton from "../components/LogoutButton";
import TitleBar from "../components/TitleBar";
import VideoPlayer from "../components/VideoPlayer";
import { setClassroomData } from "../dbFunctions/setClassroomData";
import { getUserClassroomData } from "../dbFunctions/getUserClassroomData";
import { auth, db } from "../firebase";
import { getLesson } from "../dbFunctions/getLesson";

function ClassroomPage() {
    const [classData, setClassData] = useState({
        year: "",
        category: "",
        group: "",
        classCode: "",
    });
    const [lessonId, setLessonId] = useState("");
    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonVideos, setLessonVideos] = useState([]);

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
        if (auth.currentUser) {
            getUserClassroomData(auth.currentUser.uid)
                .then((userClassData) => {
                    setClassData({
                        year: userClassData.year,
                        category: userClassData.category,
                        group: userClassData.group,
                        classCode: userClassData.classCode,
                    });

                    setClassroomData(userClassData.classCode, setLessonId);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }, [auth.currentUser]);

    useEffect(() => {
        if (auth.currentUser) {
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
                    <VideoPlayer videoUrl={lessonVideos[0]?.videoUrl} />
                    {/* <h1>{lessonId}</h1> */}
                    <h6 style={{ textAlign: "center" }}>
                        {classData.year} {classData.category} {classData.group}
                    </h6>
                </VideoPlayerContainer>

                <ChatSectionContainer>
                    <ChatSection classData={classData} />
                </ChatSectionContainer>
            </BodyContainer>

            {/* <LogoutButton /> */}
        </Container>
    );
}

export default ClassroomPage;

const Container = styled.div`
    height: 100vh;
`;

const BodyContainer = styled.div`
    display: flex;
    height: 100%;

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
