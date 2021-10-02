import {
    CHATS_2,
    PRIVATE_CHATS,
    USERS_PUBLIC_DATA,
} from "../constants/dbConsts";
import { auth, db } from "../firebase";
import firebase from "firebase";

function handleStudentsSectionData(selectedClassCode, setStudents) {
    db.collection(USERS_PUBLIC_DATA)
        .get()
        .then((data) => {
            const studentList = data.docs.map((student) => {
                if (student.data().classCode === selectedClassCode) {
                    return {
                        studentId: student.id,
                        studentData: student.data(),
                    };
                }
                return null;
            });

            // Filter valid values.
            setStudents(studentList.filter((student) => student !== null));
        })
        .catch((err) => {
            alert(err.message);
        });
}

function sendPrivateMessage(studentId, message, setMessage) {
    db.collection(PRIVATE_CHATS)
        .doc(studentId)
        .collection(CHATS_2)
        .add({
            userId: auth.currentUser.uid,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            setMessage("");
        })
        .catch((err) => {
            alert(err.message);
        });
}

export { handleStudentsSectionData, sendPrivateMessage };
