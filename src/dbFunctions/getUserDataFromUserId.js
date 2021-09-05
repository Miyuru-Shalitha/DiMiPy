import { USERS_PUBLIC_DATA } from "../constants/dbConsts";
import { db } from "../firebase";

function getUserDataFromUserId(userId) {
  return db
    .collection(USERS_PUBLIC_DATA)
    .doc(userId)
    .get()
    .then((doc) => doc.data())
    .catch((err) => alert(err.message));
}

export default getUserDataFromUserId;
