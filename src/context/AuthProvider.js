import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  logInWithGoogleHandler() {},
  passwordResetHandler() {},
  logOutHandler() {},
};

// Exported auth context object
export const AuthContext = createContext(defaultContext);

// Firebase auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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

  // User Login with google
  const logInWithGoogleHandler = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
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
    setIsLoading,
    createUserHandler,
    updateUserHandler,
    logOutHandler,
    logInUserHandler,
    logInWithGoogleHandler,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
