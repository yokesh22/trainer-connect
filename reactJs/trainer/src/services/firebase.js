import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbRkbsrD_haaTPVmGQygzr4Fd6h062pk8",
  authDomain: "trainer-739c2.firebaseapp.com",
  projectId: "trainer-739c2",
  storageBucket: "trainer-739c2.appspot.com",
  messagingSenderId: "50340862030",
  appId: "1:50340862030:web:d0fd7860779ca93a5a4b1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
export {auth,provider,db};