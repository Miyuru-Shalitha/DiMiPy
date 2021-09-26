import { db } from "../firebase";

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

export { handlePublishLesson };
