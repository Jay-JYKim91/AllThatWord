import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai';
import * as authFunctions from '../services/auth_service';
import * as repo from '../services/repository';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    authFunctions.signInWithGoogle().then((response) => {
      console.log(response.user.uid);
      repo.checkNewUser(response.user.uid);
      navigate('/');
    });
  };

  const handleGithubLogin = async () => {
    authFunctions.signInWithGithub().then((response) => {
      // console.log(response.user.uid);
      repo.checkNewUser(response.user.uid);
      navigate('/');
    });
  };

  return (
    <div className="px-6 md:px-9 lg:px-12 py-12 md:py-18 lg:py-24 text-center">
      <p className="font-heading_font text-4xl dark:text-white">LOGIN</p>
      <ul className="w-fit m-auto py-4 text-xl text-white">
        <li className="mb-2 border-2 bg-primary-900 rounded border-primary-900 dark:border-white transition hover:bg-white hover:text-primary-900">
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="flex items-center cursor-pointer w-full px-6 py-2 "
          >
            <AiFillGoogleCircle className="mr-4 text-2xl" />
            Sign in with Google
          </button>
        </li>
        <li className="bg-primary-900 border-2 rounded border-primary-900 dark:border-white transition hover:bg-white hover:text-primary-900">
          <button
            type="button"
            onClick={() => handleGithubLogin()}
            className="flex items-center cursor-pointer w-full px-6 py-2 "
          >
            <AiFillGithub className="mr-4 text-2xl" />
            Sign in with Github
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Login;
