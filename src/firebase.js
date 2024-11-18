import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtPgj2F01gb1f5vhWsTzB9a2m2-4pQsRk",
  authDomain: "fir-crud-e2a75.firebaseapp.com",
  projectId: "fir-crud-e2a75",
  storageBucket: "fir-crud-e2a75.firebasestorage.app",
  messagingSenderId: "181330987610",
  appId: "1:181330987610:web:9b10bc0122ac28710ce663"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)