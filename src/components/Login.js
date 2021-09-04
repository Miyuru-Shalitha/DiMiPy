import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
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

        <Link to={SIGN_UP_ROUTE}>Sign Up</Link>
      </LoginForm>
    </LoginContainer>
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
  width: 30%;
  height: 30%;
  padding: 3rem;
  border: 1px solid #999;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 15px 1px #999;
`;
