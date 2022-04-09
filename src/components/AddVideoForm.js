import React, { useState } from "react";
import styled from "styled-components";
import { db, storage } from "../firebase";
// import firebase from "firebase";
import { filterCommonClassCode } from "../dbFunctions/handleClassSectionData";
import { handleVideoSectionData } from "../dbFunctions/handleVideoSectionData";
import { LESSONS, LESSON_SERIES, VIDEOS } from "../constants/dbConsts";

function AddVideoForm({ selectedClassCode, selectedLessonId, setVideoList }) {
  const [video, setVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  //   const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection(LESSON_SERIES)
      .doc(filterCommonClassCode(selectedClassCode))
      .collection(LESSONS)
      .doc(selectedLessonId)
      .collection(VIDEOS)
      .add({
        timestamp: new Date().getTime(),
        videoTitle: videoTitle,
        numOfQuestions: youtubeURL, // "numOfQuestions" should be changed to "youtubeURL" in database
      })
      .then(() => {
        setVideoTitle("");
        setYoutubeURL("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setVideoTitle(e.target.value);
        }}
        value={videoTitle}
      />
      <input
        type="text"
        placeholder="Youtube URL"
        onChange={(e) => {
          setYoutubeURL(e.target.value);
        }}
        value={youtubeURL}
      />
      <button type="submit">Add to list</button>
    </Container>
  );
}

export default AddVideoForm;

const Container = styled.form`
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const UploadButton = styled.button`
//   border-radius: 0.5rem;
//   border: none;
//   margin-top: 0.2rem;
//   padding: 0.5rem;
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     transform: translateY(-2px) scale(1.03);
//     box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.3);
//   }

//   &:active {
//     transform: translateY(-1px);
//     box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.6);
//   }
// `;
