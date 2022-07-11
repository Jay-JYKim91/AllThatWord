import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../services/firebase';

const Admin: React.FC = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div>
      <button type="button" onClick={() => handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Admin;
