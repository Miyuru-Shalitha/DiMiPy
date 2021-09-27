import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

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

            if (t % 500 === 0) {
                setMilliseconds(0);
                setSeconds(0);
                setMinutes(0);

                setQuestionNum((prevValue) => prevValue + 1);
            }

            // Set next video.
            if (t === currentVideo.numOfQuestions * 500) {
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
                }, 5000);
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
                <>
                    <h1>
                        {minutes < 10 && "0"}
                        {minutes}min {seconds < 10 && "0"}
                        {seconds}s {milliseconds < 10 && "0"}
                        {milliseconds}ms
                    </h1>
                    <h2>Question: {questionNum}</h2>
                </>
            )}
        </>
    );
}

export default VideoPlayer;
