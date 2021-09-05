import { auth, db } from "../firebase";
import firebase from "firebase";
import { USERS, USERS_PUBLIC_DATA } from "../constants/dbConsts";

function createUser(
  username,
  password,
  email,
  name,
  address,
  phone,
  selectedCategory,
  selectedYear,
  selectedGroup,
  profileAvatarURL
) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>
      authUser.user
        .updateProfile({
          displayName: username,
          password: password,
        })
        .then(
          db
            .collection(USERS)
            .doc(auth.currentUser?.uid)
            .set({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              userId: auth.currentUser?.uid,
              name: name,
              email: email,
              address: address,
              phone: phone,
              username: username,
              selectedCategory: selectedCategory,
              selectedYear: selectedYear,
              selectedGroup: selectedGroup,
              profileAvatarURL: profileAvatarURL,
            })
            .then(() => {
              db.collection(USERS_PUBLIC_DATA)
                .doc(auth.currentUser?.uid)
                .set({
                  userId: auth.currentUser?.uid,
                  name: name,
                  username: username,
                  selectedCategory: selectedCategory,
                  selectedYear: selectedYear,
                  selectedGroup: selectedGroup,
                  profileAvatarURL: profileAvatarURL,
                })
                .catch((err) => alert(err.message));
            })
            .catch((err) => alert(err.message))
        )
        .catch((err) => alert(err.message))
    )
    .catch((err) => alert(err.message));
}

export default createUser;
