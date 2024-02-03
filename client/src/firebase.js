// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eb-realstate.firebaseapp.com",
  projectId: "eb-realstate",
  storageBucket: "eb-realstate.appspot.com",
  messagingSenderId: "982153301778",
  appId: "1:982153301778:web:57345eb9b38bbbbdb3adcb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);