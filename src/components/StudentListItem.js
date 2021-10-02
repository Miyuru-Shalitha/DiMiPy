import React from "react";
import styled from "styled-components";
import FallbackAvatar from "./material-components/FallbackAvatar";

function StudentListItem({ username }) {
    return (
        <Container>
            <FallbackAvatar
                username={username}
                profilePhotoURL="https://lh3.googleusercontent.com/a-/AOh14GjIk7WKI6OgEtqZE1uIXK7r7H7bJNwyEOPmVqLK=s96-c"
            />

            <Name>{username}</Name>
        </Container>
    );
}

export default StudentListItem;

const Container = styled.div`
    background-color: #aaffaa;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;

    display: flex;
    align-items: center;

    &:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.6);
    }
`;

const Name = styled.h3``;
