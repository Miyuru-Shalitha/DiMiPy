import { db } from "../firebase";
import { USERS } from "../constants/dbConsts";

function getUserClassroomData(userId) {
  db.collection(USERS)
    .doc(userId)
    .get()
    .then((doc) => {
      console.log(doc.data());
    })
    .catch((err) => {
      alert(err.message);
    });
}

export { getUserClassroomData };
