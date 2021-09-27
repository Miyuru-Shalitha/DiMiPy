import { db, auth } from "../firebase";
import firebase from "firebase";
import { CHAT, CHATS } from "../constants/dbConsts";

function sendPublicMessage(classCode, message, setMessage) {
    db.collection(CHATS)
        .doc(classCode)
        .collection(CHAT)
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

export default sendPublicMessage;
