import { Button, TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import RadioButtonsGroup from "./material-components/RadioButtonsGroup";
import SimpleMenu from "./material-components/SimpleMenu";

const THEORY = "theory";
const REVISION = "revision";

function SignUp() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
  const handleSelectedYear = (year) => {
    alert(year);
  };

  const showRadioButtons = () => {
    if (selectedCategory === THEORY) {
      return (
        <RadioButtonsGroup
          radioItems={{
            itemTitles: ["2021", "2022", "2023"],
            func: handleSelectedYear,
          }}
        />
      );
    } else if (selectedCategory === REVISION) {
      return (
        <RadioButtonsGroup
          radioItems={{
            itemTitles: ["2021"],
            func: handleSelectedYear,
          }}
        />
      );
    } else {
      return;
    }
  };

  return (
    <SignUpContainer>
      <SignUpForm action="">
        <TextField type="email" label="Email" variant="outlined" />
        <TextField type="text" label="Name" variant="outlined" />
        <TextField type="text" label="Address" variant="outlined" />
        <TextField type="tel" label="Phone" variant="outlined" />
        <SimpleMenu
          menuTitle="Category"
          menuItems={{
            itemTitles: [THEORY, REVISION],
            func: handleSelectCategory,
          }}
        />
        {showRadioButtons()}
        <Button variant="contained" color="primary">
          Sign Up
        </Button>
      </SignUpForm>
    </SignUpContainer>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 30%;
  height: 70%;
  padding: 3rem;
  border: 1px solid #999;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 15px 1px #999;
`;
