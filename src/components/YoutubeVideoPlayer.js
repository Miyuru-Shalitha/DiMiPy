import React, { useEffect, useState } from "react";

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
    <>
      <iframe
        width="560"
        height="315"
        src={currentVideoURL}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <button onClick={handlePreviousButton}>Previous</button>
      <button onClick={handleNextButton}>Next</button>
    </>
  );
}

export default YoutubeVideoPlayer;
