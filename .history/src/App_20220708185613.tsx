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
      <header>
        <div className="flex justify-between bg-red-100">
          {/* <div className="w-[100px] h-[100px] overflow-hidden relative">
            <img
              className="absolute min-h-full min-w-full m-auto left-[-100%] right-[-100%] top-[-100%] bottom-[-100%]"
              src="./logo_small.png"
              alt="logo"
            />
          </div> */}
          <img className="w-[100px]" src="./logo_small.png" alt="logo" />
          <img className="w-[65px] h-[65px]" src="./avatar.png" alt="avatar" />
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
