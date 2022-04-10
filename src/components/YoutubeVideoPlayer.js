import React, { useEffect, useState } from "react";
import styled from "styled-components";

function YoutubeVideoPlayer({ videos }) {
  const [currentVideoURL, setCurrentVideoURL] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    setCurrentVideoURL(videos[currentVideoIndex]?.videoUrl);
    console.log(videos);
  }, [videos, currentVideoIndex]);

  const handlePreviousButton = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevValue) => --prevValue);
    }
  };

  const handleNextButton = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prevValue) => ++prevValue);
    }
  };

  return (
    <YoutubePlayerContainer>
      <YoutubePlayerIframe
        // width="560"
        // height="315"
        src={currentVideoURL}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></YoutubePlayerIframe>

      <Controls>
        {currentVideoIndex > 0 && (
          <PreviousButton onClick={handlePreviousButton}>
            Previous Lesson
          </PreviousButton>
        )}
        {currentVideoIndex < videos.length - 1 && (
          <NextButton onClick={handleNextButton}>Next Lesson</NextButton>
        )}
      </Controls>
    </YoutubePlayerContainer>
  );
}

export default YoutubeVideoPlayer;

const YoutubePlayerContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const YoutubePlayerIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Controls = styled.div``;

const PreviousButton = styled.button`
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
  cursor: pointer;
  background-color: #279c4e;
  color: #fff;
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

const NextButton = styled.button`
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  background-color: #343aeb;
  color: #fff;
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
