import firebase from 'firebase';

class AuthService {
    login(provider) {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        return firebase.auth().signInWithPopup(authProvider);
    }
}

export default AuthService;