import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { filterCommonClassCode } from "../dbFunctions/handleClassSectionData";
import { handleVideoSectionData } from "../dbFunctions/handleVideoSectionData";
import { db } from "../firebase";
import UploadVideoForm from "./UploadVideoForm";
import VideoListItem from "./VideoListItem";

function VideosSection({ selectedClassCode, selectedLessonId }) {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        if (selectedClassCode && selectedLessonId) {
            const commonClassCode = filterCommonClassCode(selectedClassCode);

            handleVideoSectionData(
                commonClassCode,
                selectedLessonId,
                setVideoList
            );
        }
    }, [selectedClassCode, selectedLessonId]);

    return (
        <Section>
            <VideosContainer>
                <SectionHeading>Videos</SectionHeading>

                <VideoList>
                    {videoList.map(
                        ({ videoId, videoTitle, numOfQuestions, videoUrl }) => (
                            <VideoListItem
                                key={videoId}
                                videoTitle={videoTitle}
                                numOfQuestions={numOfQuestions}
                                videoUrl={videoUrl}
                            />
                        )
                    )}
                </VideoList>

                <UploadVideoForm
                    selectedClassCode={selectedClassCode}
                    selectedLessonId={selectedLessonId}
                    setVideoList={setVideoList}
                />
            </VideosContainer>

            <VideoPreview>
                <SectionHeading>Video Preview</SectionHeading>

                <ReactPlayer
                    url="https://firebasestorage.googleapis.com/v0/b/digital-mission-of-physi-c2c4f.appspot.com/o/Lesson%202%2FVID_20210621_130427%5B1%5D.mp4?alt=media&token=9ef9983d-e609-4f0b-8a50-9e485da3ab5e"
                    width="1280"
                    height="1024"
                    controls={true}
                />
            </VideoPreview>
        </Section>
    );
}

export default VideosSection;

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
`;

const VideoList = styled.div`
    flex: 1;
`;

const VideoPreview = styled.div`
    background-color: #ff5cad;
`;
