import Admin from 'page/Admin';
import Home from 'page/Home';
import Login from 'page/Login';
import Search from 'page/Search';
import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';
import React from 'react';

const App: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  return (
    <div className="app font-body_font">
      <header className="px-6 md:px-9 lg:px-12 py-4 shadow-md bg-primary-900">
        <div className="flex justify-between max-w-7xl m-auto">
          <button type="button" onClick={navigateHome}>
            <img
              className="w-[50px] h-[50px]"
              src="./logo_small.png"
              alt="logo"
            />
          </button>
          <button
            type="button"
            onClick={navigateLogin}
            className="flex self-center border-2 border-white p-2 bg-primary-900 text-white rounded 
            transition hover:bg-white  hover:border-white hover:text-primary-900 hover:ease-linear"
          >
            <img src="./login.png" alt="login" className="w-6 mr-2" />
            <p className="font-heading_font">LOGIN</p>
          </button>
          {/* <img className="w-[50px] h-[50px]" src="./avatar.png" alt="avatar" /> */}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
};

export default App;
