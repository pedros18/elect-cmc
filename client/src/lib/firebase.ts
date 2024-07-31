// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4KLm_ueh1k-b_LDSKz5N7CxXq6KY0Gw4",
  authDomain: "electro-commerce-215a5.firebaseapp.com",
  projectId: "electro-commerce-215a5",
  storageBucket: "electro-commerce-215a5.appspot.com",
  messagingSenderId: "1024083546055",
  appId: "1:1024083546055:web:ea9fb655313c4e6a5e13e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();