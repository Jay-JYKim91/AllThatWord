import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { auth } from '../services/firebase';
import { AuthContext } from '../context/authContext';

// interface Word {
//   key: string;
//   value: {
//     word: string;
//     phonetics: [];
//     meanings: [];
//   }
// }

type Props = {
  words: object;
  setWords: React.Dispatch<React.SetStateAction<object>>;
};

const Admin: React.FC<Props> = ({ words }) => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);

  useEffect(() => {
    if (!userInfo) {
      alert('You need to login first.');
      navigate('/login');
    }
  }, [auth]);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  console.log(words);

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => handleLogout()}
          className="flex items-center bg-primary-900 text-white px-2 py-1 rounded"
        >
          <IoLogOut className="mr-1 text-2xl" />
          Logout
        </button>
      </div>
      <h1>My Words</h1>
      {/* {Object.keys(words).map((key) => {
        return <p>{words[key]}</p>;
      })} */}
    </div>
  );
};

export default Admin;
