// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf4cSgKXgimJ-o-ucBkL5okzCFovri5rA",
  authDomain: "teamtags-434fd.firebaseapp.com",
  projectId: "teamtags-434fd",
  storageBucket: "teamtags-434fd.firebasestorage.app",
  messagingSenderId: "399458148063",
  appId: "1:399458148063:web:d2a5d66915e179ce10936a",
  measurementId: "G-KLYTLYCPRX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
