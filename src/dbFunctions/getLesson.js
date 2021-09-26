import {
    CLASSES,
    LESSONS,
    LESSON_SERIES,
    WELCOME,
} from "../constants/dbConsts";
import { db } from "../firebase";
import { filterCommonClassCode } from "./handleClassSectionData";

function getLesson(classCode, setLessonTitle, setLessonVideos) {
    return db
        .collection(CLASSES)
        .doc(classCode)
        .get()
        .then((doc) => {
            const publishedLessonId = doc.data().lessonId;

            if (publishedLessonId === WELCOME) {
                alert("Welcome!");
                return;
            }

            const commonClassCode = filterCommonClassCode(classCode);

            const lessonRef = db
                .collection(LESSON_SERIES)
                .doc(commonClassCode)
                .collection(LESSONS);

            lessonRef
                .doc(publishedLessonId)
                .get()
                .then((doc) => {
                    setLessonTitle({
                        lessonName: doc.data().lessonName,
                    });
                })
                .then(() => {
                    lessonRef
                        .doc(publishedLessonId)
                        .collection("videos")
                        .onSnapshot((docSnapshot) => {
                            // if (docSnapshot.exists) {
                            //     console.log(docSnapshot);
                            // }
                            const videos = docSnapshot.docs.map((doc) => ({
                                videoId: doc.id,
                                videoTitle: doc.data().videoTitle,
                                videoUrl: doc.data().videoUrl,
                                numOfQuestions: doc.data().numberOfQuestions,
                            }));

                            setLessonVideos(videos);
                        });
                    // classRef.onSnapshot((docSnapshot) => {
                    //     if (docSnapshot.exists) {
                    //       setLessonId(docSnapshot.data().lessonId);
                    //     }
                    //   })
                })
                .catch((err) => {
                    alert(err.message);
                });
        })
        .catch((err) => {
            alert(err.message);
        });
}

export { getLesson };
