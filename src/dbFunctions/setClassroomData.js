import { CLASSES } from "../constants/dbConsts";
import { db } from "../firebase";

// // Get classroom data.
// function getClassroomData(classId) {
//   const classRef = db.collection(CLASSES).doc(classId);

//   return classRef
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         return doc.data();
//       } else {
//         classRef
//           .set({
//             lessonId: "",
//           })
//           .then(() => {
//             classRef.get().then((doc) => {
//               alert("You are the first student for this class!");

//               return doc.data();
//             });
//           });
//       }
//     })
//     .catch((err) => {
//       alert(err.message);
//     });
// }

function setClassroomData(classId, setLessonId, setIsQuizZoneOn) {
  const classRef = db.collection(CLASSES).doc(classId);

  classRef.onSnapshot((docSnapshot) => {
    if (docSnapshot.exists) {
      setLessonId(docSnapshot.data().lessonId);

      const isQuizZoneOn = docSnapshot.data().isQuizZoneOn;

      if (isQuizZoneOn === undefined || !isQuizZoneOn) {
        setIsQuizZoneOn(false);
      } else {
        setIsQuizZoneOn(true);
      }
    }
  });
}

export { setClassroomData };
