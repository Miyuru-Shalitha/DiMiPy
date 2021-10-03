import { CHAT, CHATS, TIMESTAMP } from "../constants/dbConsts";
import { db } from "../firebase";

function getPublicMessages(classCode, setChat, isDesc = false) {
    if (isDesc) {
        return db
            .collection(CHATS)
            .doc(classCode)
            .collection(CHAT)
            .orderBy(TIMESTAMP, "desc")
            .onSnapshot((snapshot) => {
                setChat(
                    snapshot.docs.map((doc) => ({
                        chatId: doc.id,
                        chat: doc.data(),
                    }))
                );
            });
    } else {
        return db
            .collection(CHATS)
            .doc(classCode)
            .collection(CHAT)
            .orderBy(TIMESTAMP)
            .onSnapshot((snapshot) => {
                setChat(
                    snapshot.docs.map((doc) => ({
                        chatId: doc.id,
                        chat: doc.data(),
                    }))
                );
            });
    }
}

export default getPublicMessages;
