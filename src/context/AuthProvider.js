import React, { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

// Default context object for better auto complition
const defaultContext = {
  user: {},
  createUserHandler(email, password) {},
  updateUserHandler() {},
  signInUserHandler() {},
  passwordResetHandler() {},
  signOutHandler() {},
};

// Exported auth context object
export const AuthContext = createContext(defaultContext);

// Firebase auth
const auth = getAuth(app);

// -------------------------------- //
// Auth Provider component fucntion
// -------------------------------- //

const AuthProvider = ({ children }) => {
  // State slices
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Create a user with email and password
  const createUserHandler = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Auth object value
  const authInfo = { createUserHandler };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
