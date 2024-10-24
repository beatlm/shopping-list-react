import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBdY-IZN1csG71W8tJmejqpDjvVaIQSsqs",
  authDomain: "mishoppinglist-c74d2.firebaseapp.com",
  databaseURL: "https://mishoppinglist-c74d2.firebaseio.com",
  projectId: "mishoppinglist-c74d2",
  storageBucket: "mishoppinglist-c74d2.appspot.com",
  messagingSenderId: "302200915672",
  appId: "1:302200915672:web:4d3e3f9e830d2416d6f9ad",
  measurementId: "G-R2FPE3YFNM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

