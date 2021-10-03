import { db } from "../firebase";
import { CHATS, CHAT, PRIVATE_CHATS, CHATS_2 } from "../constants/dbConsts";

function deleteChat(classCode, chatId) {
    db.collection(CHATS)
        .doc(classCode)
        .collection(CHAT)
        .doc(chatId)
        .delete()
        .then(() => {
            alert("Deleted");
        })
        .catch((err) => {
            alert(err.message);
        });
}

function deletePrivateChat(userId, chatId) {
    db.collection(PRIVATE_CHATS)
        .doc(userId)
        .collection(CHATS_2)
        .doc(chatId)
        .delete()
        .then(() => {
            alert("Deleted");
        })
        .catch((err) => alert(err.message));
}

export { deleteChat, deletePrivateChat };
