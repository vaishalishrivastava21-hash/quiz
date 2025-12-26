// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Correct import
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_azjP6Xcl2mVXbh_4KAC5-0m1kuPRXM8",
  authDomain: "moodtracker-48baa.firebaseapp.com",
  projectId: "moodtracker-48baa",
  storageBucket: "moodtracker-48baa.firebasestorage.app",
  messagingSenderId: "195119450440",
  appId: "1:195119450440:web:eb6bcee3e478bdb9c1cb7d",
  measurementId: "G-18VGSZLN6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
const db = getFirestore(app);
export { db };