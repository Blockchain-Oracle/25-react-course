// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmi9430-R7_TnAIZT4eNJZfswTnH_ziZg",
  authDomain: "react-course-dc0a8.firebaseapp.com",
  projectId: "react-course-dc0a8",
  storageBucket: "react-course-dc0a8.appspot.com",
  messagingSenderId: "543242636479",
  appId: "1:543242636479:web:44c6ceb512b7b0ac858a0a",
  measurementId: "G-T8Q4M4DTY3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function loginUsingEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
}

async function registerWithEmailAndPassword(name, email, password) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    console.log(user.uid); // Changed from user.id to user.uid
    await addDoc(collection(db, "user"), {
      uid: user.uid, // Changed from user.id to user.uid
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
  }
}

const addTodoDB = async (todo) => {
  console.log(todo, "todo");

  // const { userId, text } = todo;
  //when adding todo have to pass user id
  return await addDoc(collection(db, "todos"), todo);
};

const updateTodoDB = async (todo) => {
  const { todoId, text } = todo;
  console.log(todoId, text);
  await updateDoc(doc(db, "todos", todoId), { text });
};

const removeTodoDB = async (todoId) => {
  await deleteDoc(doc(db, "todos", todoId));
};

async function logout() {
  signOut(auth);
}
export {
  auth,
  db,
  loginUsingEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  addTodoDB,
  updateTodoDB,
  removeTodoDB,
};
