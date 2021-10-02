import React, { useState } from "react";
import styled from "styled-components";
import { sendPrivateMessage } from "../dbFunctions/handleStudentsSectionData";

function SendPrivateMessageForm({ selectedStudentId }) {
    const [message, setMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();

        sendPrivateMessage(selectedStudentId, message, setMessage);
    };

    return (
        <Container onSubmit={submit}>
            <TextInput
                type="text"
                placeholder="Send a private message"
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                value={message}
            />
            <CreateButton type="submit">Send</CreateButton>
        </Container>
    );
}

export default SendPrivateMessageForm;

const Container = styled.form`
    padding: 0.5rem;
    display: flex;
`;

const TextInput = styled.input`
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    border: none;
`;

const CreateButton = styled.button`
    border-radius: 0.5rem;
    border: none;
    padding: 0 0.5rem;
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
