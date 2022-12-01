// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlR94hoSl4ISWzmMlZHJB5_pCFtBArnyM",
  authDomain: "als-vietnam.firebaseapp.com",
  projectId: "als-vietnam",
  storageBucket: "als-vietnam.appspot.com",
  messagingSenderId: "261252948566",
  appId: "1:261252948566:web:41fc4a8d8939f448f391f7",
  measurementId: "G-KWY0X2KRCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);