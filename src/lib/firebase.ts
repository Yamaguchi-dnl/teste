import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  "projectId": "ovdio-academy-landing",
  "appId": "1:1004137866851:web:99171ce04d0607e0173a56",
  "storageBucket": "ovdio-academy-landing.firebasestorage.app",
  "apiKey": "AIzaSyDMeG4nQRrQk14owi-sJc0D-5JfU6E0W1E",
  "authDomain": "ovdio-academy-landing.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1004137866851"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
