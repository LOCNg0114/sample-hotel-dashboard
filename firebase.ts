// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCamDU-1F3xHYdDYaX6ZZfB-cVHtl4f_BU",
    authDomain: "netflix-clone-55909.firebaseapp.com",
    projectId: "netflix-clone-55909",
    storageBucket: "netflix-clone-55909.appspot.com",
    messagingSenderId: "885385062646",
    appId: "1:885385062646:web:a5781a7b6ad9ab5eb164d7"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app

export { auth, db }