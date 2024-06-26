// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAif_-sI33o7sYpys1K4K45NLwXGhOOgxA",
  authDomain: "storeimage-5bd51.firebaseapp.com",
  projectId: "storeimage-5bd51",
  storageBucket: "storeimage-5bd51.appspot.com",
  messagingSenderId: "460501618159",
  appId: "1:460501618159:web:2f45f078bcb4019f92ba1a",
  measurementId: "G-ZDM3BGEJCJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);