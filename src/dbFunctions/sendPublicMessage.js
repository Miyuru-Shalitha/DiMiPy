import { db, auth } from "../firebase";
import firebase from "firebase";

function sendPublicMessage(classCode, message, setMessage) {
  db.collection("chats")
    .doc(classCode)
    .collection("chat")
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
