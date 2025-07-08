import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEEvVUSHCTYhP5w8GyBfxV6amf1OqxPXU",
  authDomain: "blog-app-ab750.firebaseapp.com",
  projectId: "blog-app-ab750",
  storageBucket: "blog-app-ab750.appspot.com",
  messagingSenderId: "1082406776258",
  appId: "1:1082406776258:web:e0a2f6d1708b765d6f3a5b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
