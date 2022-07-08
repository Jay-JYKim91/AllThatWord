import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <p>logo</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="result" element={<Result />} />
        </Routes>
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
};

export default App;
