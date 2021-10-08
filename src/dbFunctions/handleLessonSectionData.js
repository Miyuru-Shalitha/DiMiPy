import { LESSONS, LESSON_SERIES, TIMESTAMP } from "../constants/dbConsts";
import { db } from "../firebase";
// import firebase from "firebase";
import { filterCommonClassCode } from "./handleClassSectionData";

const lessonSeriesRef = db.collection(LESSON_SERIES);

function handleLessonSectionData(
  commonClassCode,
  newLessonName,
  setLessonList
) {
  lessonSeriesRef
    .doc(commonClassCode)
    .collection(LESSONS)
    .add({
      lessonName: newLessonName,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      timestamp: new Date().getTime(),
    })
    .then(() => {
      getLessonList(commonClassCode, setLessonList);
    })
    .catch((err) => alert(err.message));
}

function getLessonList(commonClassCode, setLessonList) {
  lessonSeriesRef
    .doc(commonClassCode)
    .collection(LESSONS)
    .orderBy(TIMESTAMP)
    .get()
    .then((data) => {
      const lessonList = data.docs.map((lesson) => ({
        lessonId: lesson.id,
        lessonName: lesson.data().lessonName,
      }));

      setLessonList(lessonList);
    })
    .catch((err) => alert(err.message));
}

function deleteLesson(classCode, lessonId, setLessonList, setSelectedLessonId) {
  const commonClassCode = filterCommonClassCode(classCode);
  db.collection(LESSON_SERIES)
    .doc(commonClassCode)
    .collection(LESSONS)
    .doc(lessonId)
    .delete()
    .then(() => {
      // Get class list again.
      getLessonList(commonClassCode, setLessonList);
      setSelectedLessonId(null);
    })
    .catch((err) => {
      alert(err.message);
    });
}

export { handleLessonSectionData, getLessonList, deleteLesson };
