import React from "react";
import styled from "styled-components";

function PublishVideoForm() {
    return (
        <Container>
            <Text>Selected lesson: Hello, world!</Text>
            <Text>Published lesson: Hello, world!</Text>
        </Container>
    );
}

export default PublishVideoForm;

const Container = styled.form`
    position: absolute;
    top: 0;
    left: 0;
`;

const Text = styled.h3``;
