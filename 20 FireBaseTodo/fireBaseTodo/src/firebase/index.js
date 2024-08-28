// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
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

// async function getTodo(db) {
//   const todoColomn = collection(db, "todo");
//   const todoSnapshot = await getDocs(todoColomn);
//   const todolist = todoSnapshot.docs.map((doc) => doc.data);
//   console.log(todolist);
// }

export { db };
