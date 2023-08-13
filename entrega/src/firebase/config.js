// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByHesszplzPFUanvChEy0YIJuzOqtb97A",
  authDomain: "nodejs-coder.firebaseapp.com",
  projectId: "nodejs-coder",
  storageBucket: "nodejs-coder.appspot.com",
  messagingSenderId: "555643047303",
  appId: "1:555643047303:web:95e073306a0ab2e7f3d722"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore (app) /// aca le digo que consuma mi base de datos