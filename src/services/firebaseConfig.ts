// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbAUz2gMmbSncvj8d2dBzZDelg8sslkdA",
  authDomain: "stock-predictions-f2670.firebaseapp.com",
  projectId: "stock-predictions-f2670",
  storageBucket: "stock-predictions-f2670.firebasestorage.app",
  messagingSenderId: "790811374801",
  appId: "1:790811374801:web:1946c2774c080e664a81f0",
  measurementId: "G-K56ZED56H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Export everything to use in the app
export { auth, db, provider };
