import React, { useState } from "react";
import styled from "styled-components";
import { db, storage } from "../firebase";
// import firebase from "firebase";
import { filterCommonClassCode } from "../dbFunctions/handleClassSectionData";
import { handleVideoSectionData } from "../dbFunctions/handleVideoSectionData";
import { LESSONS, LESSON_SERIES, VIDEOS } from "../constants/dbConsts";

function UploadVideoForm({
  selectedClassCode,
  selectedLessonId,
  setVideoList,
}) {
  const [video, setVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSelectedVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUploadVideo = (e) => {
    e.preventDefault();

    const commonClassCode = filterCommonClassCode(selectedClassCode);

    const uploadTask = storage
      .ref(`${commonClassCode}/${video.name}`)
      .put(video);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        // Error function...
        alert(err.message);
      },
      () => {
        // Complete function...
        storage
          .ref(commonClassCode)
          .child(`${video.name}`)
          .getDownloadURL()
          .then((url) => {
            // Post video inside db
            db.collection(LESSON_SERIES)
              .doc(commonClassCode)
              .collection(LESSONS)
              .doc(selectedLessonId)
              .collection(VIDEOS)
              .add({
                // timestamp:
                //     firebase.firestore.FieldValue.serverTimestamp(),
                timestamp: new Date().getTime(),
                videoTitle: videoTitle,
                numberOfQuestions: numOfQuestions,
                videoUrl: url,
              })
              .catch((err) => {
                alert(err.message);
              });
          })
          .then(() => {
            // Update the video list.
            handleVideoSectionData(
              commonClassCode,
              selectedLessonId,
              setVideoList
            );
          })
          .catch((err) => {
            alert(err.message);
          });

        setProgress(0);
        setVideo(null);
      }
    );
  };

  return (
    <Container>
      <VideoInput
        type="file"
        placeholder="Create Item"
        onChange={handleSelectedVideo}
      />
      {video && (
        <>
          <VideoTitleInput
            type="text"
            onChange={(e) => {
              setVideoTitle(e.target.value);
            }}
            placeholder="Enter video title"
            value={videoTitle}
          />
          <QuestionsCountInput
            type="number"
            placeholder="Enter question count"
            onChange={(e) => {
              setNumOfQuestions(e.target.value);
            }}
            value={Math.abs(numOfQuestions)}
          />
        </>
      )}
      {video && <ProgressBar value={progress} max="100" />}
      {video && <UploadButton onClick={handleUploadVideo}>Upload</UploadButton>}
      {/* <CreateButton type="submit">Create</CreateButton> */}
    </Container>
  );
}

export default UploadVideoForm;

const Container = styled.form`
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  border: none;
`;

const VideoTitleInput = styled.input`
  width: 95%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.2rem;
  border: none;
`;

const QuestionsCountInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.2rem;
  max-width: 5rem;
  border: none;
`;

const ProgressBar = styled.progress`
  width: 100%;
`;

const UploadButton = styled.button`
  border-radius: 0.5rem;
  border: none;
  margin-top: 0.2rem;
  padding: 0.5rem;
  cursor: pointer;
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
