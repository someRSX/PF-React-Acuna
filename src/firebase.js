import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCeBVZLvNInkzTFfFS6cbh0jq_tivV4XcI",
    authDomain: "pfreact-c65f2.firebaseapp.com",
    projectId: "pfreact-c65f2",
    storageBucket: "pfreact-c65f2.appspot.com",
    messagingSenderId: "68023238406",
    appId: "1:68023238406:web:9570993f2b6ec8e9eee887",
    measurementId: "G-NJK9HMPZEK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);