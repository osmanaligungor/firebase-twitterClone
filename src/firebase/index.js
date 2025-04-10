// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDEh4x8T5KmAn4e4IDltjb5ATQz9Bh1OU",
  authDomain: "twitterclone-12d80.firebaseapp.com",
  projectId: "twitterclone-12d80",
  storageBucket: "twitterclone-12d80.firebasestorage.app",
  messagingSenderId: "371702829755",
  appId: "1:371702829755:web:288c4e55ff9eb128de4f9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
