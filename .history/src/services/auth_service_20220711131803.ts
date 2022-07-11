import firebase from 'firebase/compat/app';
import firebaseApp from './firebase';

class AuthService {
    login(provider: string) {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }
}

export default AuthService;