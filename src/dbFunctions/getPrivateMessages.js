import { CHATS_2, PRIVATE_CHATS, TIMESTAMP } from "../constants/dbConsts";
import { db } from "../firebase";

function getPrivateMessages(userId, setChat, isDesc = false) {
    if (isDesc) {
        return db
            .collection(PRIVATE_CHATS)
            .doc(userId)
            .collection(CHATS_2)
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
            .collection(PRIVATE_CHATS)
            .doc(userId)
            .collection(CHATS_2)
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

export default getPrivateMessages;
