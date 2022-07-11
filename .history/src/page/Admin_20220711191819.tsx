import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { AuthContext } from './context/authContext';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    {
      userInfo && <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      
      <button type="button" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
    }
    
  );
};

export default Admin;
