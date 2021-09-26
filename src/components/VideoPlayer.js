import React, { useEffect } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ videoUrl }) {
    useEffect(() => {
        console.log(videoUrl);
    }, [videoUrl]);
    return (
        <>
            <ReactPlayer
                url={videoUrl}
                width="1280"
                height="1024"
                controls={true}
            />
        </>
    );
}

export default VideoPlayer;
