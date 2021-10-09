import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

function VideoPlayer({ videos }) {
  const [currentVideo, setCurrentVideo] = useState({
    videoId: "",
    numOfQuestions: "",
    videoTitle: "",
    videoUrl: "",
  });
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [showVideoplayer, setShowVideoplayer] = useState(true);
  const [questionNum, setQuestionNum] = useState(1);

  useEffect(() => {
    setCurrentVideo(videos[videoIndex]);
  }, [videos, videoIndex]);

  const startTimer = () => {
    let t = 0;
    const TIME_FOR_A_QUESTION = 120; // In seconds.
    const NEXT_VIDEO_DELAY_TIME = 5; // In seconds.

    const timer = setInterval(() => {
      t++;

      if (t % 6000 === 0) {
        setMinutes((prevValue) => prevValue + 1);
        setSeconds(0);
      } else if (t % 100 === 0) {
        setSeconds((prevValue) => prevValue + 1);
        setMilliseconds(0);
      } else {
        setMilliseconds((prevValue) => prevValue + 1);
      }

      if (t % (100 * TIME_FOR_A_QUESTION) === 0) {
        setMilliseconds(0);
        setSeconds(0);
        setMinutes(0);

        setQuestionNum((prevValue) => prevValue + 1);
      }

      // Set next video.
      if (t === currentVideo.numOfQuestions * (100 * TIME_FOR_A_QUESTION)) {
        setVideoIndex((prevValue) => prevValue + 1);
        clearInterval(timer);
        setQuestionNum(1);

        // Delay the video player.
        setTimeout(() => {
          if (videos.length - 1 > videoIndex) {
            setShowVideoplayer(true);
          } else {
            alert("End");
          }
        }, 1000 * NEXT_VIDEO_DELAY_TIME);
      }
    }, 10);
  };

  return (
    <>
      {showVideoplayer ? (
        <ReactPlayer
          url={currentVideo?.videoUrl}
          width="1280"
          height="1024"
          controls={true}
          // progressInterval={500}
          // muted={true}
          // autoPlay={true}
          // onReady={() => console.log("Ready")}
          // onStart={() => console.log("Start")}
          // onPause={() => console.log("Pause")}
          onEnded={() => {
            startTimer();
            setShowVideoplayer(false);
          }}
          // onError={() => console.log("Error")}
        />
      ) : (
        <TimerContainer>
          <Timer>
            {minutes < 10 && "0"}
            {minutes}min {seconds < 10 && "0"}
            {seconds}s {milliseconds < 10 && "0"}
            {milliseconds}ms
          </Timer>
          <QuestionNo>Question: {questionNum}</QuestionNo>
        </TimerContainer>
      )}
    </>
  );
}

export default VideoPlayer;

const TimerContainer = styled.div`
  background-color: #000;
  color: #fff;
  height: 84vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* TEST */
  @media only screen and (max-width: 900px) {
    height: 93%;
  }
`;

const Timer = styled.h1`
  font-size: 5rem;

  /* TEST */
  @media only screen and (max-width: 900px) {
    font-size: 2rem;
  }
`;

const QuestionNo = styled.h2`
  font-size: 2rem;

  /* TEST */
  @media only screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;
