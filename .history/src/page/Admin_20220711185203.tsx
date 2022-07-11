import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <button type="button" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
};

export default Admin;
