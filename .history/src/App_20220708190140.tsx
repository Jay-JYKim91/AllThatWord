import Admin from 'page/Admin';
import Home from 'page/Home';
import Login from 'page/Login';
import Search from 'page/Search';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="app">
      <img src="./avatar/png" alt="" />
      <header className="px-6 md:px-9 lg:px-12 py-2 shadow-md bg-gray-50">
        <div className="flex justify-between bg-red-100 max-w-7xl m-auto text-center md:text-left">
          <img
            className="w-[50px] h-[50px]"
            src="./logo_small.png"
            alt="logo"
          />
          <img className="w-[50px] h-[50px]" src="./avatar.png" alt="avatar" />
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
