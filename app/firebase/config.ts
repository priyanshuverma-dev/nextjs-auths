// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCADQhCzxI7DaeAbeKSrM9RetuTVoTqDa8",
  authDomain: "testing-nextjs-f310c.firebaseapp.com",
  projectId: "testing-nextjs-f310c",
  storageBucket: "testing-nextjs-f310c.appspot.com",
  messagingSenderId: "621190539158",
  appId: "1:621190539158:web:000310d66e020ddb561fb7",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, auth, provider };
