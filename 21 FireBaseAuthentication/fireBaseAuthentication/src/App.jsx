import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FireBaseAuth from "./components/FireBaseAuth";
import Todo from "./components/Todo/Todo";
import { TodoProvider } from "./context/todoContext";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Firebase Todo App</h1>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todo"
            element={
              <FireBaseAuth>
                <Todo />
              </FireBaseAuth>
            }
          />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2023 Firebase Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
}

const Root = () => (
  // return (
  <TodoProvider>
    <App />
  </TodoProvider>
);
// );

export default Root;
