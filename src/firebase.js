// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';

import { initializeApp } from 'firebase/app';
import { getAuth ,GoogleAuthProvider  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCJ_nWqisrCj44uB9B0Nmorw6R405GVeWw",
  authDomain: "whats-app-clone-cea75.firebaseapp.com",
  projectId: "whats-app-clone-cea75",
  storageBucket: "whats-app-clone-cea75.appspot.com",
  messagingSenderId: "635372762713",
  appId: "1:635372762713:web:14ba3db9bf8ea265db6348",
  measurementId: "G-2VGPC40XCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
export default db;