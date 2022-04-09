import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { filterCommonClassCode } from "../dbFunctions/handleClassSectionData";
import {
  deleteVideo,
  handleVideoSectionData,
} from "../dbFunctions/handleVideoSectionData";
import AddVideoForm from "./AddVideoForm";
import IntervalItem from "./IntervalItem";
// import UploadVideoForm from "./UploadVideoForm";
// import VideoListItem from "./VideoListItem";
// import { addInterval } from "../dbFunctions/addInterval";
// import { db } from "../firebase";
import VideoListItem2 from "./VideoListitem2";

function VideosSection2({
  selectedClassCode,
  selectedLessonId,
  setVideoCount,
}) {
  const [videoList, setVideoList] = useState([]);
  const [preview, setPreview] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null); // For videoItem's backgroundColor change when it is clicked.
  //   const [intervalDuration, setIntervalDuration] = useState("");

  useEffect(() => {
    if (selectedClassCode && selectedLessonId) {
      const commonClassCode = filterCommonClassCode(selectedClassCode);

      handleVideoSectionData(commonClassCode, selectedLessonId, setVideoList);
    }
  }, [selectedClassCode, selectedLessonId]);

  const handleEditLesson = () => {
    alert("😁");
  };

  const handleDeleteLesson = () => {
    deleteVideo(
      selectedClassCode,
      selectedLessonId,
      selectedVideoId,
      setVideoList,
      setSelectedVideoId
    );
  };

  useEffect(() => {
    setVideoCount(videoList.length);
  }, [videoList]);

  //   const handleAddInterval = (e) => {
  //     e.preventDefault();

  //     const commonClassCode = filterCommonClassCode(selectedClassCode);

  //     addInterval(selectedLessonId, commonClassCode, setVideoList);
  //   };

  return (
    <Section>
      <VideosContainer>
        <SectionHeading>Videos</SectionHeading>
        {selectedVideoId && (
          <>
            <RightButtonsContainer>
              <EditButton onClick={handleEditLesson}>Edit</EditButton>
              <DeleteButton onClick={handleDeleteLesson}>Delete</DeleteButton>
            </RightButtonsContainer>
          </>
        )}

        <VideoListContainer>
          <VideoList>
            {videoList.map((video) => {
              if (video.videoTitle === "INTERVAL") {
                return (
                  <IntervalItem
                    key={video.videoId}
                    intervalId={video.id}
                    duration={video.duration}
                    selectedLessonId={selectedLessonId}
                    selectedClassCode={selectedClassCode}
                    setVideoList={setVideoList}
                  />
                );
              } else {
                return (
                  <VideoListItem2
                    key={video.videoId}
                    videoId={video.videoId}
                    videoTitle={video.videoTitle}
                    youtubeURL={video.numOfQuestions} // "numOfQuestions" should be changed to "youtubeURL" in firebase database
                    videoUrl={video.videoUrl}
                    setPreview={setPreview}
                    selectedVideoId={selectedVideoId}
                    setSelectedVideoId={setSelectedVideoId}
                  />
                );
              }
            })}
          </VideoList>
        </VideoListContainer>

        <AddVideoForm
          selectedClassCode={selectedClassCode}
          selectedLessonId={selectedLessonId}
          setVideoList={setVideoList}
        />

        {/* <UploadVideoForm
          selectedClassCode={selectedClassCode}
          selectedLessonId={selectedLessonId}
          setVideoList={setVideoList}
        /> */}

        {/* <IntervalForm onSubmit={handleAddInterval}>
          <input
            type="number"
            placeholder="Unit -> minutes"
            onChange={(e) => {
              setIntervalDuration(Math.abs(e.target.value));
            }}
            value={intervalDuration}
          />
          <button type="submit">Add Interval</button>
        </IntervalForm> */}
      </VideosContainer>

      <VideoPreview>
        <SectionHeading>Video Preview</SectionHeading>

        <ReactPlayer url={preview} width="1280" height="1024" controls={true} />
      </VideoPreview>
    </Section>
  );
}

export default VideosSection2;

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 92vh;
`;

const SectionHeading = styled.h2`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 0.5rem;
  text-transform: uppercase;
  letter-spacing: calc(1rem / 16);
`;

const VideosContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #72f542;
  position: relative;
`;

const RightButtonsContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.4rem;
  border-radius: 0.5rem;
`;

const EditButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  background-color: #79f77d;
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

const DeleteButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: #f77979;
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

const VideoListContainer = styled.div`
  flex: 1;
`;

const IntervalForm = styled.form`
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;

  & > button {
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #f2ff8f;
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
  }
`;

const VideoList = styled.div`
  height: 42vh;
  overflow-y: auto;
`;

const VideoPreview = styled.div`
  background-color: #ff5cad;
`;
