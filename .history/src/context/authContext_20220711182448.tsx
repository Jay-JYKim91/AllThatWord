import React, { ReactNode, useEffect, useState } from 'react';
import {
  User,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../services/firebase';

export const AuthContext = React.createContext<User | null>(null);

// export function useAuth() {
//   return useContext(AuthContext);
// }

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export async function signInWithGithub() {
  return signInWithPopup(auth, new GithubAuthProvider());
}
