import { db, auth } from "../firebase";
// import firebase from "firebase";
import { CHATS_2, PRIVATE_CHATS } from "../constants/dbConsts";

function sendPrivateMessage(message, setMessage) {
  db.collection(PRIVATE_CHATS)
    .doc(auth.currentUser.uid)
    .collection(CHATS_2)
    .add({
      userId: auth.currentUser.uid,
      message: message,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      timestamp: new Date().getTime(),
    })
    .then(() => {
      setMessage("");
    })
    .catch((err) => {
      alert(err.message);
    });
}

export default sendPrivateMessage;
