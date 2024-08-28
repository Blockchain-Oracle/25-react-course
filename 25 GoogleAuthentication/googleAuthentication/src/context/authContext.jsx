import React from "react";
import { auth } from "../Firebase";
import { createContext } from "react";
import { Children } from "react";

export const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({...user});
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe;
  }, []);
  const value = { user, auth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
