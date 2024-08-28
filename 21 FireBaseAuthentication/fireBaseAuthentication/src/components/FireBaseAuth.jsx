import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function FireBaseAuth({ children }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.error("Authentication error:", error);
    return <h1>Error: {error.message}</h1>;
  }

  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" />;
  }

  // User is valid, render the children
  return children;
}
