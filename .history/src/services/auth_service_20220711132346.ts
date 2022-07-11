// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, GoogleAuthProvider, UserCredential, signInWithPopup } from 'firebase/auth';
// import firebaseApp from './firebase';

const auth = getAuth();

class AuthService {
    async signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then(
            (response: UserCredential) => {
                console.log(response.user);
            }
        )
    }
    // login(provider: string) {
    //     const authProvider: firebase = new firebase.auth[`${provider}AuthProvider`]();
    //     return firebaseApp.auth().signInWithPopup(authProvider);
    // }
}

export default AuthService;