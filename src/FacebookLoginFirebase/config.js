import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/compat/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIF3w7dFQGQFHd1CQQZj5GGgYP98OzSEo",
  authDomain: "culturex-b9c34.firebaseapp.com",
  projectId: "culturex-b9c34",
  storageBucket: "culturex-b9c34.appspot.com",
  messagingSenderId: "820880455561",
  appId: "1:820880455561:web:1d2d183fd9396d1f601358",
  measurementId: "G-5NTEHVR6Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export default app;