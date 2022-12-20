import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8NV1HcgePVLsW0bbAm4X28rm6SIXcPxk",
  authDomain: "engine-scores.firebaseapp.com",
  projectId: "engine-scores",
  storageBucket: "engine-scores.appspot.com",
  messagingSenderId: "1070078675169",
  appId: "1:1070078675169:web:4e67bbfc2a1e7569d74fa0",
  measurementId: "G-8Q9PRZ5BSP"
};
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();



