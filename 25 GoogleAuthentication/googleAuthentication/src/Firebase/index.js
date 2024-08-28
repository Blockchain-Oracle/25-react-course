// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIuxjFTmK1DufjCcslqEVedZ2BRkwV7sU",
  authDomain: "authentication-27d7b.firebaseapp.com",
  projectId: "authentication-27d7b",
  storageBucket: "authentication-27d7b.appspot.com",
  messagingSenderId: "466722037341",
  appId: "1:466722037341:web:ecdcb1603226cadb0037b4",
  measurementId: "G-E6DPMJPXM7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const handleSignUpWithEmailAndPassword = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    console.log(user.user.email);
    console.log(user.user.uid);
    await addDoc(collection(db, "users"), {
      email: user?.user?.email,
      uid: user?.user?.uid,
      authProvider: "local",
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};
const provider = new GoogleAuthProvider();

const handleSignUpWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
    await addDoc(collection(db, "users"), {
      email: user.user.email,
      photoURL: user.user.photoURL,
      uid: user.user.uid,
      authProvider: "google",
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

const handleLoginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

const handleLogout = () => signOut(auth);

export {
  auth,
  handleSignUpWithEmailAndPassword,
  handleSignUpWithGoogle,
  loginWithEmailAndPassword,
  handleLoginWithGoogle,
  handleLogout,
};
