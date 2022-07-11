import React, { useState } from 'react';
import { UserCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai';
import { signInWithGoogle, signInWithGithub } from '../services/auth_service';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const handleGoogleLogin = async () => {
    setAuthing(true);
    signInWithGoogle().then((response: UserCredential) => {
      console.log(response.user.uid);
      navigate('/');
    });
  };
  console.log(authing);
  const handleGithubLogin = async () => {
    setAuthing(true);
    signInWithGithub().then((response: UserCredential) => {
      console.log(response.user.uid);
      navigate('/');
    });
  };

  return (
    <div className="px-6 md:px-9 lg:px-12 py-12 md:py-18 lg:py-24 text-center">
      <p className="font-heading_font text-4xl">LOGIN</p>
      <ul className="w-1/2 m-auto text-xl bg-primary-900 text-white">
        <li className="px-4 py-2">
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="flex justify-between"
          >
            <AiFillGoogleCircle />
            Sign in with Google
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleGithubLogin()}
            className="flex"
          >
            <AiFillGithub />
            Sign in with Github
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Login;
