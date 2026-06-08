import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getMessaging} from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0jtKjLnA1JBDKtZZaM7Op_T6bPS3bwMM",
  authDomain: "ecommerc-app-86358.firebaseapp.com",
  projectId: "ecommerc-app-86358",
  storageBucket: "ecommerc-app-86358.firebasestorage.app",
  messagingSenderId: "194592699789",
  appId: "1:194592699789:web:4e56d59e3a478337f839c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const messaging = getMessaging(app);


// Export everything مرة واحدة
export { db, auth, storage, collection, getDocs, addDoc, doc, updateDoc, deleteDoc ,setDoc ,messaging , };
