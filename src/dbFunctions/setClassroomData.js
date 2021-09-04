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

function setClassroomData(classId, setLessonId) {
  const classRef = db.collection(CLASSES).doc(classId);
  console.log(classId);

  classRef.onSnapshot((docSnapshot) => {
    if (docSnapshot.exists) {
      setLessonId(docSnapshot.data().lessonId);
    }
  });
}

export { setClassroomData };
