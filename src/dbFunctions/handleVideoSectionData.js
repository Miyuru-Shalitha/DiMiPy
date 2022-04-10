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
      const videoList = data.docs.map((video) => {
        if (video.data().videoTitle === "INTERVAL") {
          return {
            videoId: video.id,
            videoTitle: video.data().videoTitle,
            duration: video.data().duration,
          };
        } else {
          return {
            videoId: video.id,
            videoTitle: video.data().videoTitle,
            videoUrl: video.data().numOfQuestions,
          };
        }
      });

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
  const videoDocRef = db
    .collection(LESSON_SERIES)
    .doc(commonClassCode)
    .collection(LESSONS)
    .doc(lessonId)
    .collection(VIDEOS)
    .doc(videoId);

  videoDocRef
    .delete()
    .then(() => {
      handleVideoSectionData(commonClassCode, lessonId, setVideoList);

      setSelectedVideoId(null);
    })
    .catch((err) => {
      alert(err.message);
    });

  // videoDocRef
  //   .get()
  //   .then((doc) => {
  //     // const videoUrl = doc.data().videoUrl;
  //     // const videoRef = storage.refFromURL(videoUrl);

  //     // Delete video from storage.
  //     // videoRef.delete().then(() => {
  //     // Delete video data from database.
  //     videoDocRef
  //       .delete()
  //       .then(() => {
  //         // Get videos again.
  //         handleVideoSectionData(commonClassCode, lessonId, setVideoList);

  //         setSelectedVideoId(null);
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //         // });
  //       });
  //   })
  // .catch((err) => {
  //   alert(err.message);
  // });
}

export { handleVideoSectionData, deleteVideo };
