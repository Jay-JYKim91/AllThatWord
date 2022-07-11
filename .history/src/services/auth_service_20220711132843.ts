// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import firebaseApp from './firebase';

const auth = getAuth();

class AuthService {
  signInWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }
    // login(provider: string) {
    //     const authProvider: firebase = new firebase.auth[`${provider}AuthProvider`]();
    //     return firebaseApp.auth().signInWithPopup(authProvider);
    // }
}

export default AuthService;