import "./App.css";
import { AuthProvider } from "./context/authContext";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/LoginAndSignUp/Login";
import PreAuth from "./PreAuth";
import Dashboard from "./components/Dashboard";
import Signup from "./components/LoginAndSignUp/Signup";

function App() {
  return (
    <div id="root" className="app-container">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PreAuth>
                <Dashboard />
              </PreAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
