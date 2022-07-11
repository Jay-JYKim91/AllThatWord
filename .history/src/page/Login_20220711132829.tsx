import React, { useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth_service';

const authService = new AuthService();

const Login: React.FC = () => {
  // const auth = getAuth();
  const navigate = useNavigate();
  // const [authing, setAuthing] = useState(false);

  const handleGoogleLogin = async () => {
    authService.signInWithGoogle.then((response: UserCredential) => {
      console.log(response.user);
      navigate('/');
    });
  };

  // const signInWithGoogle = async () => {
  //   setAuthing(true);

  //   signInWithPopup(auth, new GoogleAuthProvider()).then(
  //     (response: UserCredential) => {
  //       console.log(response.user);
  //       navigate('/');
  //     }
  //   );
  //   console.log(authing);
  // };

  return (
    <div className="px-6 md:px-9 lg:px-12 py-12 md:py-18 lg:py-24 text-center">
      <p className="font-heading_font text-4xl">LOGIN</p>
      <ul>
        <li>
          <button type="button" onClick={() => handleGoogleLogin()}>
            Google
          </button>
        </li>
        <li>
          <button type="button">Github</button>
        </li>
      </ul>
    </div>
  );
};

export default Login;
