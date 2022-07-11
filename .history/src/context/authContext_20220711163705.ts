import React, { useContext, useState } from 'react';
import {
    //   getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
  } from 'firebase/auth';
import { User } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = React.createContext<User | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  async function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function signInWithGithub() {
    return signInWithPopup(auth, new GithubAuthProvider());
  }
}