import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

import { AUTHORIZATION_ROUTE, SIGN_UP_ROUTE } from "../constants/routes";

function Login() {
  const history = useHistory("");

  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth.currentUser) {
      history.push(AUTHORIZATION_ROUTE);
    }
  }, [auth.currentUser]);

  const handleUserLoginDetails = (e) => {
    const { name, value } = e.target;

    setUserLoginDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        userLoginDetails.email,
        userLoginDetails.password
      )
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <InstructionText>
        <h3>
          ඔබ මෙම වෙබ් අඩවියේ ලියාපදිංචි වී ඇත් නම් ලබාදුන් Email සහ Password
          යොදා LOGIN මත click කර ඇතුලු වන්න ඔබ මෙම වෙබ් අඩවියේ ලියාපදිංචි වී
          නොමැති නම් Sign Up මත click කර ලියාපදිංචි වන්න.
        </h3>
      </InstructionText>

      <LoginContainer>
        <LoginForm onSubmit={handleSignIn}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            onChange={handleUserLoginDetails}
            value={userLoginDetails.email}
            name="email"
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            onChange={handleUserLoginDetails}
            value={userLoginDetails.password}
            name="password"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>

          {/* <Link to={SIGN_UP_ROUTE}>Sign Up</Link> */}
          <Button variant="outlined" href={SIGN_UP_ROUTE}>
            Sign Up
          </Button>
        </LoginForm>

        {/* <InstructionText>
          <h3>
            ඔබ මෙම වෙබ් අඩවියේ ලියාපදිංචි වී ඇත් නම් ලබාදුන් Email සහ Password
            යොදා LOGIN මත click කර ඇතුලු වන්න ඔබ මෙම වෙබ් අඩවියේ ලියාපදිංචි වී
            නොමැති නම් Sign Up මත click කර ලියාපදිංචි වන්න.
          </h3>
        </InstructionText> */}
      </LoginContainer>
    </>
  );
}

export default Login;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* width: 30%; */
  flex: 0 0 30%;
  height: 30%;
  padding: 3rem;
  border: 1px solid #999;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 15px 1px #999;

  position: relative;

  @media only screen and (max-width: 37.5em) {
    /* 600px */
    /* width: 60%; */
    flex: 0 0 60%;
  }
`;

const InstructionText = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  background-color: #ffff00;
  color: #614e00;
  padding: 1rem;
  z-index: 100;
`;
