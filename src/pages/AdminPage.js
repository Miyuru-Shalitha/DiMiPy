import React, { useState } from "react";
import styled from "styled-components";
import ClassSection from "../components/ClassSection";
import PrivateChatSection from "../components/PrivateChatSection";
import PublicChatSection from "../components/PublicChatSection";
import TitleBar from "../components/TitleBar";
import VideosSection from "../components/VideosSection";

function AdminPage() {
    const [selectedClassCode, setSeletedClassCode] = useState(null);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [videoCount, setVideoCount] = useState(0);

    return (
        <Container>
            <TitleBar />

            <BodyContainer>
                <ClassSection
                    selectedClassCode={selectedClassCode}
                    setSeletedClassCode={setSeletedClassCode}
                    selectedLessonId={selectedLessonId}
                    setSelectedLessonId={setSelectedLessonId}
                    videoCount={videoCount}
                />

                <VideosSection
                    selectedClassCode={selectedClassCode}
                    selectedLessonId={selectedLessonId}
                    setVideoCount={setVideoCount}
                />

                <PrivateChatSection selectedClassCode={selectedClassCode} />

                <PublicChatSection selectedClassCode={selectedClassCode} />
            </BodyContainer>
        </Container>
    );
}

export default AdminPage;

const Container = styled.div``;

const BodyContainer = styled.div`
    display: flex;

    /* TEST */
    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;
