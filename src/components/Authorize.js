import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CLASSROOM_ROUTE, SIGN_UP_ROUTE } from "../constants/routes";

function Authorize() {
  const [secretKey, setSecretKey] = useState("123456");

  const [userSecretKey, setUserSecretKey] = useState("");

  const history = useHistory("");

  const handleAuthorize = (e) => {
    e.preventDefault();

    if (userSecretKey === secretKey) {
      history.push(CLASSROOM_ROUTE);
    }
  };

  return (
    <AuthorizeContainer>
      <AuthorizeForm onSubmit={handleAuthorize}>
        <TextField
          type="password"
          label="Secret Key"
          variant="outlined"
          onChange={(e) => {
            setUserSecretKey(e.target.value);
          }}
          value={userSecretKey}
          name="secretKey"
        />
        <Button type="submit" variant="contained" color="primary">
          Go to classroom
        </Button>

        <Link to={SIGN_UP_ROUTE}>Sign Up</Link>
      </AuthorizeForm>
    </AuthorizeContainer>
  );
}

export default Authorize;

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
