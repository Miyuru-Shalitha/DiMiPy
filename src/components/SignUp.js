import { Button, TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import RadioButtonsGroup from "./material-components/RadioButtonsGroup";
import SimpleMenu from "./material-components/SimpleMenu";
import firebase from "firebase";
import { useHistory } from "react-router";

import { AUTHORIZATION_ROUTE } from "../constants/routes";

const THEORY = "Theory";
const REVISION = "Revision";
const YEAR = "Select Year";
const SELECTGROUP = "Select Group";

const DEFAULT_THEORY_YEAR = "2021";
const DEFAULT_THEORY_GROUP = "All Islend";
const DEFAULT_REVISION_YEAR = "2021";
const DEFAULT_REVISION_GROUP = "All Islend";

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

  const history = useHistory("");

  ////////////////////////////////////////////////////////////////////////////

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);

    // Set categories defalut values if category RadioButtons not clicked.
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

    auth
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((authUser) =>
        authUser.user
          .updateProfile({
            displayName: userDetails.username,
            password: userDetails.password,
          })
          .then(
            db.collection("users").doc(auth.currentUser?.uid).set({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              userId: auth.currentUser?.uid,
              name: userDetails.name,
              email: userDetails.email,
              address: userDetails.address,
              phone: userDetails.phone,
              username: userDetails.username,
              selectedCategory: selectedCategory,
              selectedYear: selectedYear,
              selectedGroup: selectedGroup,
              profileAvatar:
                "https://lh3.googleusercontent.com/a-/AOh14GjIk7WKI6OgEtqZE1uIXK7r7H7bJNwyEOPmVqLK=s96-c",
            }),
            history.push(AUTHORIZATION_ROUTE)
          )
          .catch((err) => alert(err.message))
      )
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
              itemTitles: ["2021", "2022", "2023"],
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
              itemTitles: ["2021"],
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

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSignUp}>
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

const RadioGroupContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
