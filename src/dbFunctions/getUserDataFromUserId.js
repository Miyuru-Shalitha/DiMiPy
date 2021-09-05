import { USERS } from "../constants/dbConsts";
import { db } from "../firebase";

function getUserDataFromUserId(userId) {
  return db
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => doc.data())
    .catch((err) => alert(err.message));
}

export default getUserDataFromUserId;
