// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfLYnDatDk_SfHL82SbfAPYIhulCbZQ1A",
  authDomain: "innventorymanagement.firebaseapp.com",
  projectId: "innventorymanagement",
  storageBucket: "innventorymanagement.appspot.com",
  messagingSenderId: "412597102842",
  appId: "1:412597102842:web:6a2f93a24b6c749eb6c143"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export { auth };