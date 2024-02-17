import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

//Init DB
const firebaseConfig = {
    apiKey: "AIzaSyDLTBQxEZH-fzdoDKqImdKLHNRTZZhQUYA",
    authDomain: "whatsapp-clone2-6da71.firebaseapp.com",
    projectId: "whatsapp-clone2-6da71",
    storageBucket: "whatsapp-clone2-6da71.appspot.com",
    messagingSenderId: "833555321773",
    appId: "1:833555321773:web:53d160b2ab5105b8278724"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const Provider = new GoogleAuthProvider();
