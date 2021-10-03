import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { ROOT_ROUTE } from "../constants/routes";
import { auth } from "../firebase";

function LogoutButton() {
    const history = useHistory("");

    const [user, setUser] = useState(null);

    // If user logged in setUser and user does not logged in redirect to login page.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                history.push(ROOT_ROUTE);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user]);

    return (
        <LogOutBtn
            onClick={() => {
                auth.signOut();
            }}
        >
            Log Out
        </LogOutBtn>
    );
}

export default LogoutButton;

const LogOutBtn = styled.button`
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    /* ***************************** */
    position: absolute;
    top: 0.8rem;
    left: 0.5rem;
    /* ***************************** */

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
