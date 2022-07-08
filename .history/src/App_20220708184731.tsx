import Admin from 'page/Admin';
import Home from 'page/Home';
import Login from 'page/Login';
import Search from 'page/Search';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <div className="flex justify-between">
          <div className="w-[100px] h-[100px] bg-[url('./logo_small.png')]"></div>
          <img className="w-[80px]" src="./avatar.png" alt="avatar" />
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
