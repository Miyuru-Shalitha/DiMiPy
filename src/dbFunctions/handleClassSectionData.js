import { CLASSES } from "../constants/dbConsts";
import { db } from "../firebase";

const classRef = db.collection(CLASSES);

function handleClassSectionData(newClassCode, setClassList) {
    classRef
        .doc(newClassCode)
        .set({
            lessonId: "welcome",
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

export { handleClassSectionData, getClassList };
