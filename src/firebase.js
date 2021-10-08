import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDigpX_wnTH4CT9yIaMJYF0P2wwhD2kif4",
  authDomain: "digital-mission-of-physics.firebaseapp.com",
  projectId: "digital-mission-of-physics",
  storageBucket: "digital-mission-of-physics.appspot.com",
  messagingSenderId: "884119829204",
  appId: "1:884119829204:web:06d29c4e9e72fc20751941",
  measurementId: "G-PGP4QV1CXD",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();

// const t = firebase.database.ServerValue.TIMESTAMP;
// console.log(t);
// console.log(firebase.firestore.FieldValue.serverTimestamp());
export { db, auth, storage };
