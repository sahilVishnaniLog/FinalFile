//INFO : PROJECT NAME : JIRA--TEAMS-APPLICATION
//INFO : APPLICATION NAME : WEB-DEV TEST
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI7x-vFs5QU1zgOna6S24IUsHXzRlH9Po",
  authDomain: "jira--teams-application.firebaseapp.com",
  projectId: "jira--teams-application", // shared within the project
  storageBucket: "jira--teams-application.firebasestorage.app", // shared with the projst
  messagingSenderId: "352357560678",
  appId: "1:352357560678:web:5ffa362d9c3761c3fe98a7", // unique to an application
  measurementId: "G-2ML2GKX829",
};
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Error intializing firebase", error);
  throw error;
}
export const auth = app ? getAuth(app) : null;

export const db = app ? getFirestore(app) : null;

export const storage = app ? getStorage(app) : null;

export const googleProvider = app ? new GoogleAuthProvider() : null;
if (googleProvider) {
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
}

console.log(" firebase initialization");
