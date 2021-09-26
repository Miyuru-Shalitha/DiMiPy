import {
    CLASSES,
    LESSONS,
    LESSON_SERIES,
    WELCOME,
} from "../constants/dbConsts";
import { db } from "../firebase";
import { filterCommonClassCode } from "./handleClassSectionData";

function handlePublishLesson(classCode, lessonId) {
    db.collection("classes")
        .doc(classCode)
        .set({
            lessonId: lessonId,
        })
        .then(() => {
            alert("Lesson published successfully!");
        })
        .catch((err) => {
            alert(err.message);
        });
}

function getPublishedLesson(classCode, setLessonName) {
    db.collection(CLASSES)
        .doc(classCode)
        .get()
        .then((doc) => {
            const publishedLessonId = doc.data().lessonId;

            if (publishedLessonId === WELCOME) {
                alert("Welcome!");
                return;
            }

            const commonClassCode = filterCommonClassCode(classCode);

            db.collection(LESSON_SERIES)
                .doc(commonClassCode)
                .collection(LESSONS)
                .doc(publishedLessonId)
                .get()
                .then((doc) => {
                    setLessonName(doc.data().lessonName);
                })
                .catch((err) => {
                    alert(err.message);
                });
        })
        .catch((err) => {
            alert(err.message);
        });
}

export { handlePublishLesson, getPublishedLesson };
