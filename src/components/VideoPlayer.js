import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  return (
    <>
      <ReactPlayer
        url="https://firebasestorage.googleapis.com/v0/b/digital-mission-of-physi-c2c4f.appspot.com/o/Lesson%202%2FVID_20210621_130427%5B1%5D.mp4?alt=media&token=9ef9983d-e609-4f0b-8a50-9e485da3ab5e"
        width="1280"
        height="1024"
        controls={true}
      />
    </>
  );
}

export default VideoPlayer;
