import {
    LESSONS,
    LESSON_SERIES,
    TIMESTAMP,
    VIDEOS,
} from "../constants/dbConsts";
import { db } from "../firebase";

function handleVideoSectionData(
    commonClassCode,
    selectedLessonId,
    setVideoList
) {
    db.collection(LESSON_SERIES)
        .doc(commonClassCode)
        .collection(LESSONS)
        .doc(selectedLessonId)
        .collection(VIDEOS)
        .orderBy(TIMESTAMP)
        .get()
        .then((data) => {
            const videoList = data.docs.map((video) => ({
                videoId: video.id,
                videoTitle: video.data().videoTitle,
                numOfQuestions: video.data().numberOfQuestions,
                videoUrl: video.data().videoUrl,
            }));

            setVideoList(videoList);
        })
        .catch((err) => {
            alert(err.message);
        });
}

export { handleVideoSectionData };
