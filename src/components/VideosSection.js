import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { filterCommonClassCode } from "../dbFunctions/handleClassSectionData";
import {
    deleteVideo,
    handleVideoSectionData,
} from "../dbFunctions/handleVideoSectionData";
import UploadVideoForm from "./UploadVideoForm";
import VideoListItem from "./VideoListItem";

function VideosSection({ selectedClassCode, selectedLessonId, setVideoCount }) {
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

    const handleEditLesson = () => {};

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

    return (
        <Section>
            <VideosContainer>
                <SectionHeading>Videos</SectionHeading>
                {selectedVideoId && (
                    <>
                        <RightButtonsContainer>
                            <EditButton onClick={handleEditLesson}>
                                Edit
                            </EditButton>
                            <DeleteButton onClick={handleDeleteLesson}>
                                Delete
                            </DeleteButton>
                        </RightButtonsContainer>
                    </>
                )}

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

const VideoList = styled.div`
    height: 42vh;
    overflow-y: scroll;
`;

const VideoPreview = styled.div`
    background-color: #ff5cad;
`;
