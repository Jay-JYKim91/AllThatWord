import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseApp from './firebase';

class AuthService {
    login(provider: string) {
        const authProvider: firebase = new firebase.auth[`${provider}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }
}

export default AuthService;