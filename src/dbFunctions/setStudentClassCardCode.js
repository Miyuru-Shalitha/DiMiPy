import { USERS } from "../constants/dbConsts";
import { db } from "../firebase";
import { getStudentClassCardCord } from "./getStudentClassCardCord";

function setStudentClassCardCode(studentId, classCardCode, setClassCardCode) {
  db.collection(USERS)
    .doc(studentId)
    .set(
      {
        classCardCode: classCardCode,
      },
      { merge: true }
    )
    .then(() => {
      setClassCardCode("");
      alert("Class Card Code is updated successfully.");

      getStudentClassCardCord(studentId, setClassCardCode); // Update student class card code.
    })
    .catch((err) => {
      alert(err.message);
    });
}

export { setStudentClassCardCode };
