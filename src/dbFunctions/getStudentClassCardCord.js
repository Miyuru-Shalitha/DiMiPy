import { USERS } from "../constants/dbConsts";
import { db } from "../firebase";

function getStudentClassCardCord(studentId, setClassCardCode) {
  db.collection(USERS)
    .doc(studentId)
    .get()
    .then((doc) => {
      const storedClassCardCode = doc.data().classCardCode;
      if (storedClassCardCode !== undefined) {
        setClassCardCode(storedClassCardCode);
      }
    });
}

export { getStudentClassCardCord };
