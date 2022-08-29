// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx-6a6XCF17fX_ajjARo2-jr-ZKsC18Tk",
  authDomain: "fire-base-practice-1213f.firebaseapp.com",
  projectId: "fire-base-practice-1213f",
  storageBucket: "fire-base-practice-1213f.appspot.com",
  messagingSenderId: "166518568343",
  appId: "1:166518568343:web:bb2a22db78318b58ed00d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()