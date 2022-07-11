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
    <div>
      <button type="button" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
};

export default Admin;
