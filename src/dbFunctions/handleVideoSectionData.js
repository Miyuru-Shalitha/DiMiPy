import {
    LESSONS,
    LESSON_SERIES,
    TIMESTAMP,
    VIDEOS,
} from "../constants/dbConsts";
import { db, storage } from "../firebase";
import { filterCommonClassCode } from "./handleClassSectionData";

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

function deleteVideo(
    classCode,
    lessonId,
    videoId,
    setVideoList,
    setSelectedVideoId
) {
    const commonClassCode = filterCommonClassCode(classCode);
    db.collection(LESSON_SERIES)
        .doc(commonClassCode)
        .collection(LESSONS)
        .doc(lessonId)
        .collection(VIDEOS)
        .doc(videoId)
        .get()
        .then((doc) => {
            const videoUrl = doc.data().videoUrl;
            const videoRef = storage.refFromURL(videoUrl);
            videoRef.delete().then(() => {
                console.log("Video deleted from storage");

                db.collection("lessonSeries")
                    .doc(commonClassCode)
                    .collection("lessons")
                    .doc(lessonId)
                    .collection("videos")
                    .doc(videoId)
                    .delete()
                    .then(() => {
                        console.log("Video data deleted from db");

                        // Get videos again.
                        handleVideoSectionData(
                            commonClassCode,
                            lessonId,
                            setVideoList
                        );

                        setSelectedVideoId(null);
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            });
        })
        .catch((err) => {
            alert(err.message);
        });
}

export { handleVideoSectionData, deleteVideo };
