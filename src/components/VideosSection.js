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
    const [preview, setPreview] = useState("");
    const [selectedVideoId, setSelectedVideoId] = useState(null); // For videoItem's backgroundColor change when it is clicked.

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

                <VideoListContainer>
                    <VideoList>
                        {videoList.map(
                            ({
                                videoId,
                                videoTitle,
                                numOfQuestions,
                                videoUrl,
                            }) => (
                                <VideoListItem
                                    key={videoId}
                                    videoId={videoId}
                                    videoTitle={videoTitle}
                                    numOfQuestions={numOfQuestions}
                                    videoUrl={videoUrl}
                                    setPreview={setPreview}
                                    selectedVideoId={selectedVideoId}
                                    setSelectedVideoId={setSelectedVideoId}
                                />
                            )
                        )}
                    </VideoList>
                </VideoListContainer>

                <UploadVideoForm
                    selectedClassCode={selectedClassCode}
                    selectedLessonId={selectedLessonId}
                    setVideoList={setVideoList}
                />
            </VideosContainer>

            <VideoPreview>
                <SectionHeading>Video Preview</SectionHeading>

                <ReactPlayer
                    url={preview}
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

const VideoListContainer = styled.div`
    flex: 1;
`;

const VideoList = styled.div`
    height: 42vh;
    overflow-y: scroll;
`;

const VideoPreview = styled.div`
    background-color: #ff5cad;
`;
