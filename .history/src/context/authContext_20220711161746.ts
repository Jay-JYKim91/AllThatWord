import React from 'react';
import { User } from 'firebase/auth';

export default AuthContext = React.createContext<User | null>(null);