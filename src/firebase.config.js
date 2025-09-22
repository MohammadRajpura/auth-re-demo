// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqKaKiYmuMdgRmcqlZN7fZ-OGP29tM2gU",
  authDomain: "auth-re-demo.firebaseapp.com",
  projectId: "auth-re-demo",
  storageBucket: "auth-re-demo.firebasestorage.app",
  messagingSenderId: "1062237838594",
  appId: "1:1062237838594:web:d21d1f398f7b99ae9fb61b",
  measurementId: "G-W5HD7D67NV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
