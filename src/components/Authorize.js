import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CLASSROOM_ROUTE } from "../constants/routes";
import { auth, db } from "../firebase";
import LogoCircles from "../assets/logo-circles.svg";
import LogoRoundedText from "../assets/logo-rounded-text.svg";
import { USERS } from "../constants/dbConsts";

function Authorize() {
  const [userClassCardCode, setUserClassCardCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory("");

  useEffect(() => {
    if (auth.currentUser) {
      setIsLoggedIn(true);
    }
  }, [auth.currentUser]);

  const handleAuthorize = (e) => {
    e.preventDefault();

    const currUser = auth.currentUser;

    if (currUser) {
      db.collection(USERS)
        .doc(currUser.uid)
        .get()
        .then((doc) => {
          if (userClassCardCode === doc.data().classCardCode) {
            db.collection(USERS)
              .doc(currUser.uid)
              .set(
                {
                  authorized: true,
                },
                { merge: true }
              )
              .then(() => {
                history.push(CLASSROOM_ROUTE);
              })
              .catch((err) => {
                alert(err.message);
              });
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        {!isLoggedIn && (
          <LoadingContainer>
            <ImagesContainer>
              <LoadingImageCircle src={LogoCircles} alt="loading" />
              <LoadingImageRoundedText src={LogoRoundedText} alt="loading" />
            </ImagesContainer>
          </LoadingContainer>
        )}
      </>
    );
  }

  return (
    <AuthorizeContainer>
      <AuthorizeForm onSubmit={handleAuthorize}>
        <TextField
          type="password"
          label="Enter Class Card Code"
          variant="outlined"
          onChange={(e) => {
            setUserClassCardCode(e.target.value);
          }}
          value={userClassCardCode}
          name="secretKey"
        />
        <Button type="submit" variant="contained" color="primary">
          Go to classroom
        </Button>

        {/* <Link to={SIGN_UP_ROUTE}>Sign Up</Link> */}
      </AuthorizeForm>
    </AuthorizeContainer>
  );
}

export default Authorize;

const LoadingContainer = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagesContainer = styled.div`
  flex: 0 0 20rem;
  height: 20rem;

  position: relative;
`;

const LoadingImageCircle = styled.img`
  width: 20rem;
  height: 20rem;

  position: absolute;
  top: 0;
  left: 0;
`;

const LoadingAnimation = keyframes`
from {
  transform: rotate(0);
}
to {
  transform: rotate(360deg);
}
`;

const LoadingImageRoundedText = styled.img`
  width: 20rem;
  height: 20rem;

  position: absolute;
  top: 0;
  left: 0;

  animation: ${LoadingAnimation} 5s linear infinite;
`;

const AuthorizeContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthorizeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 30%;
  height: 30%;
  padding: 3rem;
  border: 1px solid #999;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 15px 1px #999;
`;
