import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  User,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface IUser {
  displayName?: string;
}

const AuthContext = React.createContext<User | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}
interface Props {
  children?: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(loading);

  async function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function signInWithGithub() {
    return signInWithPopup(auth, new GithubAuthProvider());
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signInWithGoogle,
    signInWithGithub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
