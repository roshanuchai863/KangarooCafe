
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyBFd4wiXpAvYTUdQVrEv86_4nZwCTTcIFE",
    authDomain: "crossplatform-66185.firebaseapp.com",
    databaseURL: "https://crossplatform-66185-default-rtdb.firebaseio.com",
    projectId: "crossplatform-66185",
    storageBucket: "crossplatform-66185.appspot.com",
    messagingSenderId: "977367022977",
    appId: "1:977367022977:web:c79eed49c92f3b7633fc80",
    measurementId: "G-765CPEV9NL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
