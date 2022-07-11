import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { auth } from '../services/firebase';
import { AuthContext } from '../context/authContext';

const Admin: React.FC = () => {
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

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <div className="flex content-end">
        <button
          type="button"
          onClick={() => handleLogout()}
          className="bg-primary-900 text-white px-2 py-1 rounded"
        >
          <IoLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
