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
        <p>header</p>
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
