// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHoE8RIMca3dlJniHJxwB9eej5sYOLbZU",
  authDomain: "registration-of-users.firebaseapp.com",
  projectId: "registration-of-users",
  storageBucket: "registration-of-users.appspot.com",
  messagingSenderId: "70918840219",
  appId: "1:70918840219:web:6f6c01a774d8ff2bf34b3e",
  measurementId: "G-DXVZY48C3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }