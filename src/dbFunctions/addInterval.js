import { LESSONS, LESSON_SERIES, VIDEOS } from "../constants/dbConsts";
import { db } from "../firebase";
import { handleVideoSectionData } from "./handleVideoSectionData";

function addInterval(selectedLessonId, commonClassCode, setVideoList) {
  const videosRef = db
    .collection(LESSON_SERIES)
    .doc(commonClassCode)
    .collection(LESSONS)
    .doc(selectedLessonId)
    .collection(VIDEOS);

  videosRef
    .add({
      videoTitle: "INTERVAL",
      duration: 5,
      timestamp: new Date().getTime(),
    })
    .then(() => {
      console.log("Add interval");

      handleVideoSectionData(commonClassCode, selectedLessonId, setVideoList);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export { addInterval };
