import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

// Default context object for better auto complition
const defaultContext = {
  user: {},
  createUserHandler(email, password) {},
  updateUserHandler(displayName) {},
  logInUserHandler(email, password) {},
  passwordResetHandler() {},
  logOutHandler() {},
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

  // Update user display name
  const updateUserHandler = (displayName) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  };

  // Login user
  const logInUserHandler = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logut user
  const logOutHandler = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  // Observe auth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setIsLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // Auth object value
  const authInfo = {
    user,
    isLoading,
    createUserHandler,
    updateUserHandler,
    logOutHandler,
    logInUserHandler,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
