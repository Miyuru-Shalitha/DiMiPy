import React from "react";
import styled from "styled-components";

function VideoListItem({ videoTitle, numOfQuestions, videoUrl }) {
    return (
        <Container>
            <VideoTitle>
                <TextSpan>VideoTitle:</TextSpan> {videoTitle}
            </VideoTitle>
            <NumOfQuestions>
                <TextSpan>Number of questions:</TextSpan> {numOfQuestions}
            </NumOfQuestions>
        </Container>
    );
}

export default VideoListItem;

const Container = styled.div`
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: #eb9b34;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.6);
    }
`;

const VideoTitle = styled.h2``;

const NumOfQuestions = styled.h3``;

const TextSpan = styled.span`
    color: #595959;
    font-style: italic;
`;
