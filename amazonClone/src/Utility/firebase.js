// src/Utility/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyClZWyYkl0BAN9cYo1gzWGtg7F-RMc8PxQ",
  authDomain: "clone-app-c3da4.firebaseapp.com",
  projectId: "clone-app-c3da4",
  storageBucket: "clone-app-c3da4.appspot.com", 
  messagingSenderId: "294844571157",
  appId: "1:294844571157:web:2a87ac7f1157409cab381c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // ← fixed this
