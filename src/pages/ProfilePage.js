import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { USERS, USERS_PUBLIC_DATA } from "../constants/dbConsts";
import { auth, db, storage } from "../firebase";
import LogoutButton from "../components/LogoutButton";

function ProfilePage() {
  const [profileAvatar, setProfileAvatar] = useState(null);
  const [progress, setProgress] = useState(0);
  const [profileAvatarUrl, setProfileAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const currentUser = auth?.currentUser;

    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const storedUserData = doc.data();

          setProfileAvatarUrl(storedUserData.profileAvatarURL);
          setName(storedUserData.name);
          setEmail(storedUserData.email);
          setAddress(storedUserData.address);
          setPhone(storedUserData.phone);
          setUsername(storedUserData.username);
        });
    }
  }, [auth?.currentUser]);

  const handleSelectImage = (e) => {
    if (e.target.files[0]) {
      setProfileAvatar(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const uploadTask = storage
      .ref(`ProfileAvatars/${profileAvatar.name}`)
      .put(profileAvatar);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        // Error function...
        alert(err.message);
      },
      () => {
        // Complete function...
        storage
          .ref("ProfileAvatars")
          .child(`${profileAvatar.name}`)
          .getDownloadURL()
          .then((url) => {
            auth.currentUser.updateProfile({
              photoURL: url,
            });

            // Post video inside db
            db.collection(USERS)
              .doc(auth?.currentUser.uid)
              .set(
                {
                  profileAvatarURL: url,
                },
                { merge: true }
              )
              .then(() => {
                db.collection(USERS_PUBLIC_DATA)
                  .doc(auth?.currentUser.uid)
                  .set(
                    {
                      profileAvatarURL: url,
                    },
                    { merge: true }
                  )
                  .catch((err) => {
                    alert(err.message);
                  });
              })
              .catch((err) => {
                alert(err.message);
              });
          })
          .catch((err) => {
            alert(err.message);
          });

        setProgress(0);
        setProfileAvatar(null);
      }
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <AvatarContainer>
        <ProfileAvatar src={profileAvatarUrl} alt="Student profile picture" />
      </AvatarContainer>

      <ImageUploadForm onSubmit={handleUpload}>
        <input type="file" onChange={handleSelectImage} />
        <button>Upload</button>

        {profileAvatar && <ProgressBar value={progress} max="100" />}
      </ImageUploadForm>

      <UserDataForm onSubmit={handleSave}>
        <label htmlFor="profile_name">Name</label>
        <input
          id="profile_name"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <button>Save</button>
      </UserDataForm>

      <UserDataForm onSubmit={handleSave}>
        <label htmlFor="profile_email">Email</label>
        <input
          id="profile_email"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <button>Save</button>
      </UserDataForm>

      <UserDataForm onSubmit={handleSave}>
        <label htmlFor="profile_address">Address</label>
        <input
          id="profile_address"
          type="text"
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <button>Save</button>
      </UserDataForm>

      <UserDataForm onSubmit={handleSave}>
        <label htmlFor="profile_phone">Phone</label>
        <input
          id="profile_phone"
          type="tel"
          placeholder="Phone"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          value={phone}
        />
        <button>Save</button>
      </UserDataForm>

      <UserDataForm onSubmit={handleSave}>
        <label htmlFor="profile_username">Username</label>
        <input
          id="profile_username"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <button>Save</button>
      </UserDataForm>

      <LogoutButton />
    </Container>
  );
}

export default ProfilePage;

const Container = styled.div`
  /* height: 100vh; */

  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem; */
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 1rem;

  transform: translate(-50%, -50%);

  & input {
    padding: 0.5rem;
    margin: 0.5rem 0;
    flex: 1;
    border-radius: 0.5rem;
    border: 0.16rem solid #009150;
    outline: none;
    transition: all 0.2s;

    :hover {
      border: 0.16rem solid #87ffc9;
    }

    :focus {
      border: 0.16rem solid #ffdb59;
    }
  }
`;

const AvatarContainer = styled.div`
  width: 15rem;
  height: 15rem;
  overflow: hidden;
  border-radius: 10rem;
  border: 0.5rem solid #0ffff0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileAvatar = styled.img`
  width: 100%;
`;

const ImageUploadForm = styled.form``;

const ProgressBar = styled.progress`
  width: 100%;
`;

const UserDataForm = styled.form`
  /* display: flex; */

  /* & > input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    flex: 1;
    border-radius: 0.5rem;
    border: 0.16rem solid #009150;
    outline: none;
    transition: all 0.2s;

    :hover {
      border: 0.16rem solid #87ffc9;
    }

    :focus {
      border: 0.16rem solid #ffdb59;
    }
  } */
`;
