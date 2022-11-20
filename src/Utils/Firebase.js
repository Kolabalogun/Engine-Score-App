import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyDYAU8T2UlrBqiG2jFkZC1Jj0RmZFz5Cqw",
  
    authDomain: "engine-score-app.firebaseapp.com",
  
    projectId: "engine-score-app",
  
    storageBucket: "engine-score-app.appspot.com",
  
    messagingSenderId: "322625476598",
  
    appId: "1:322625476598:web:aaf404ee2881d9558d59d7",
  
    measurementId: "G-M9H278WNX7"
  
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



