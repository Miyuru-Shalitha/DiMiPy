import { Button, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

function Login() {
  const history = useHistory("");

  useEffect(() => {
    if (auth.currentUser) {
      history.push("/classroom");
    }
  }, [auth.currentUser]);

  return (
    <LoginContainer>
      <LoginForm action="">
        <TextField type="text" label="Username" variant="outlined" />
        <TextField type="password" label="Password" variant="outlined" />
        <Button variant="contained" color="primary">
          Login
        </Button>

        <Link to="/sign-up">Sign Up</Link>
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
