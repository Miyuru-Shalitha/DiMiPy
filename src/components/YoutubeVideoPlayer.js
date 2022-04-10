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
          <button onClick={handlePreviousButton}>Previous</button>
        )}
        {currentVideoIndex < videos.length - 1 && (
          <button onClick={handleNextButton}>Next</button>
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
