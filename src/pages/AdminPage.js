import React from "react";
import styled from "styled-components";
import ClassSection from "../components/ClassSection";
import PrivateChatSection from "../components/PrivateChatSection";
import PublicChatSection from "../components/PublicChatSection";
import TitleBar from "../components/TitleBar";
import VideosSection from "../components/VideosSection";

function AdminPage() {
    return (
        <Container>
            <TitleBar />

            <BodyContainer>
                <ClassSection />

                <VideosSection />

                <PrivateChatSection />

                <PublicChatSection />
            </BodyContainer>
        </Container>
    );
}

export default AdminPage;

const Container = styled.div``;

const BodyContainer = styled.div`
    display: flex;
`;
