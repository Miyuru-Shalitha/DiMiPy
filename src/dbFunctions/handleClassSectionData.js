import {
    CLASSES,
    LESSONS,
    LESSON_SERIES,
    WELCOME,
} from "../constants/dbConsts";
import { db } from "../firebase";
import firebase from "firebase";

const classRef = db.collection(CLASSES);
const lessonSeriesRef = db.collection(LESSON_SERIES);

function handleClassSectionData(newClassCode, setClassList) {
    classRef
        .doc(newClassCode)
        .set({
            lessonId: WELCOME,
        })
        .then(() => {
            createNewLessonSeries(newClassCode);
        })
        .then(() => {
            getClassList(setClassList);
        })
        .catch((err) => alert(err.message));
}

function getClassList(setClassList) {
    classRef
        // .orderBy()
        .get()
        .then((data) => {
            const classList = data.docs.map((cls) => ({
                classCode: cls.id,
                lessonId: cls.data().lessonId,
            }));

            setClassList(classList);
        })
        .catch((err) => alert(err.message));
}

function createNewLessonSeries(newClassCode) {
    const commonClassCode = filterCommonClassCode(newClassCode);
    lessonSeriesRef
        .doc(commonClassCode)
        .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            alert(`An empty lesson series for ${commonClassCode} is created.`);
        })
        .catch((err) => {
            alert(err.message);
        });
}

function filterCommonClassCode(newClassCode) {
    return newClassCode.slice(5, 10);
}

function deleteClass(classCode, setSeletedClassCode) {
    const commonClassCode = filterCommonClassCode(classCode);

    db.collection(CLASSES)
        .doc(classCode)
        .delete()
        .then(() => {
            db.collection(LESSON_SERIES)
                .doc(commonClassCode)
                .delete()
                .then(() => {
                    setSeletedClassCode(null);
                })
                .catch((err) => {
                    alert(err.message);
                });
        })
        .catch((err) => {
            alert(err.message);
        });
}

export {
    handleClassSectionData,
    getClassList,
    filterCommonClassCode,
    deleteClass,
};
