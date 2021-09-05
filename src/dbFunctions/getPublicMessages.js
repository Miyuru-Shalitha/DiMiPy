import { CHAT, CHATS } from "../constants/dbConsts";
import { db } from "../firebase";

function getPublicMessages(classCode, setChat) {
  db.collection(CHATS)
    .doc(classCode)
    .collection(CHAT)
    .orderBy("timestamp")
    .onSnapshot((snapshot) => {
      setChat(
        snapshot.docs.map((doc) => ({
          chatId: doc.id,
          chat: doc.data(),
        }))
      );
    });
}

export default getPublicMessages;
