
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2p0O6te6yTL3BdGExZtn-kbVrnfHF0ik",
  authDomain: "wiee-cc8f1.firebaseapp.com",
  projectId: "wiee-cc8f1",
  storageBucket: "wiee-cc8f1.firebasestorage.app",
  messagingSenderId: "807205421852",
  appId: "1:807205421852:web:a5aea4006b376c2bacb0d9",
  measurementId: "G-QYB1P1XND3"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
