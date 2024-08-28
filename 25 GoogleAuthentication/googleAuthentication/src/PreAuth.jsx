import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { Route, Navigate } from "react-router-dom";

export default function PreAuth({ children }) {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <>
        <h3>...loading</h3>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3>Error:{error.message}</h3>
      </>
    );
  }
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" />;
  }

  // User is valid, render the children
  return children;
}
