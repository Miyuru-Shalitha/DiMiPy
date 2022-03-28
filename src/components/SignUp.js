import { Button, TextField } from "@material-ui/core";
import React from "react";
import styled, { keyframes } from "styled-components";
import RadioButtonsGroup from "./material-components/RadioButtonsGroup";
import SimpleMenu from "./material-components/SimpleMenu";
import { useHistory } from "react-router";

import { AUTHORIZATION_ROUTE } from "../constants/routes";
import createUser from "../dbFunctions/createUser";

const THEORY = "Theory";
const REVISION = "Revision";
const YEAR = "Select Year";
const SELECTGROUP = "Select Group";

const DEFAULT_THEORY_YEAR = "2022";
const DEFAULT_THEORY_GROUP = "All Island";
const DEFAULT_REVISION_YEAR = "2022";
const DEFAULT_REVISION_GROUP = "All Island";

function SignUp() {
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    username: "",
    password: "",
  });

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  const [showInstructions, setShowInstructions] = React.useState(false);

  const history = useHistory("");

  ////////////////////////////////////////////////////////////////////////////

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);

    // Set categories default values if category RadioButtons not clicked.
    if (selectedCategory === THEORY) {
      setSelectedYear(DEFAULT_THEORY_YEAR);
      setSelectedGroup(DEFAULT_THEORY_GROUP);
    } else {
      setSelectedYear(DEFAULT_REVISION_YEAR);
      setSelectedGroup(DEFAULT_REVISION_GROUP);
    }
  };
  const handleSelectedYear = (year) => {
    setSelectedYear(year);
  };
  const handleSelectedGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (
      userDetails.name === "" ||
      userDetails.email === "" ||
      userDetails.address === "" ||
      userDetails.phone === "" ||
      userDetails.password === ""
    ) {
      alert("Please enter all the details!");
      return;
    } else if (
      selectedCategory === null ||
      selectedYear === null ||
      selectedGroup === null
    ) {
      alert("Please select the category!");
      return;
    }

    createUser(
      userDetails.username,
      userDetails.password,
      userDetails.email,
      userDetails.name,
      userDetails.address,
      userDetails.phone,
      selectedCategory,
      selectedYear,
      selectedGroup,
      ""
    )
      .then(() => {
        history.push(AUTHORIZATION_ROUTE);
      })
      .catch((err) => alert(err.message));
  };
  ////////////////////////////////////////////////////////////////////////////

  const showRadioButtons = () => {
    if (selectedCategory === THEORY) {
      return (
        <RadioGroupContainer>
          <RadioButtonsGroup
            labelName={YEAR}
            radioItems={{
              itemTitles: ["2022", "2023", "2024"],
              func: handleSelectedYear,
            }}
          />
          <RadioButtonsGroup
            labelName={SELECTGROUP}
            radioItems={{
              itemTitles: ["All Islend", "Kurunegala", "Kandy"],
              func: handleSelectedGroup,
            }}
          />
        </RadioGroupContainer>
      );
    } else if (selectedCategory === REVISION) {
      return (
        <RadioGroupContainer>
          <RadioButtonsGroup
            labelName={YEAR}
            radioItems={{
              itemTitles: ["2022"],
              func: handleSelectedYear,
            }}
          />
          <RadioButtonsGroup
            labelName={SELECTGROUP}
            radioItems={{
              itemTitles: ["All Islend", "Kurunegala", "Kandy"],
              func: handleSelectedGroup,
            }}
          />
        </RadioGroupContainer>
      );
    } else {
      return;
    }
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);

    setTimeout(() => {
      setShowInstructions(false);
    }, 10000);
  };

  return (
    <SignUpContainer>
      {showInstructions && (
        <InstructionText>
          <h3>
            ඔබගේ පංතිය තෝරාගන්න නිවැරදිව ලිපිනය ඇතුලු කිරීම ඔබේ වගකීමකි. නිබන්ධන
            එවීමේදී මෙම ලිපිනය භාවිතා වන බව සලකන්න.
          </h3>
        </InstructionText>
      )}

      <SignUpForm onSubmit={handleSignUp}>
        <HelpButton onClick={handleShowInstructions}>Help</HelpButton>

        <TextField
          type="text"
          label="Name: Eg: A.B.Lahiru Ekanayaka"
          variant="outlined"
          onChange={handleUserDetails}
          value={userDetails.name}
          name="name"
          required
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          onChange={handleUserDetails}
          value={userDetails.email}
          name="email"
          required
        />
        <TextField
          type="text"
          label="Address"
          variant="outlined"
          onChange={handleUserDetails}
          value={userDetails.address}
          name="address"
          required
        />
        <TextField
          type="tel"
          label="Phone"
          variant="outlined"
          onChange={handleUserDetails}
          value={userDetails.phone}
          name="phone"
          required
        />
        <SimpleMenu
          menuTitle="Category"
          menuItems={{
            itemTitles: [THEORY, REVISION],
            func: handleSelectCategory,
          }}
        />
        {showRadioButtons()}
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          onChange={handleUserDetails}
          value={userDetails.username}
          name="username"
          required
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          onChange={handleUserDetails}
          value={userDetails.password}
          name="password"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </SignUpForm>
    </SignUpContainer>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const animationInFromTop = keyframes`
  0% {
    transform: translateY(-100%);
  }

  5% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(0);
  }

  95% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
`;

const InstructionText = styled.div`
  position: absolute;
  top: 0;

  text-align: center;
  background-color: #ffff00;
  padding: 0.5rem;
  z-index: 100;
  animation: ${animationInFromTop} 10s ease-out;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 30%;
  /* flex: 0.7 0 30%; */
  /* height: 70%; */
  min-height: 80vh;
  padding: 3rem;
  border: 1px solid #999;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 15px 1px #999;

  position: relative;

  @media only screen and (max-width: 37.5em) {
    /* 600px */
    width: 60%;
  }
`;

const HelpButton = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: #fff647;
  color: #575200;
  padding: 0.3rem;
  border-radius: 0.3rem;
  cursor: pointer;
  box-shadow: 0 0 0.5rem rgba(89, 89, 89, 0.5);
  transition: all 0.2s;

  &:hover {
    background-color: #eee212;
  }

  &:active {
    transform: translateY(0.16rem);
    box-shadow: 0 0 0.2rem rgba(89, 89, 89, 0.5);
  }
`;

const RadioGroupContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-evenly;
`;
