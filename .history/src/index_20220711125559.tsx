import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthService from './services/auto_service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const authService = new AuthService();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authService={authService} />
    </BrowserRouter>
  </React.StrictMode>
);
