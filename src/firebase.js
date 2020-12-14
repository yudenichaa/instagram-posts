import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAaUQgDvDYQ0Qv2rcRdQH4IwFWUMBocPFY",
    authDomain: "instagram-clone-2b93c.firebaseapp.com",
    databaseURL: "https://instagram-clone-2b93c.firebaseio.com",
    projectId: "instagram-clone-2b93c",
    storageBucket: "instagram-clone-2b93c.appspot.com",
    messagingSenderId: "31026304093",
    appId: "1:31026304093:web:5fc6140c169a4e540369b4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
