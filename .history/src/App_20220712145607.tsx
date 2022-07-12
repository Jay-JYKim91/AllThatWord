import Admin from 'page/Admin';
import Home from 'page/Home';
import Login from 'page/Login';
import Search from 'page/Search';
import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useContext, useState } from 'react';
import { IoLogIn } from 'react-icons/io5';
import { AuthContext } from './context/authContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const userInfo = useContext(AuthContext);
  const [words, setWords] = useState({});
  // console.log(userInfo);

  const navigateHome = () => {
    navigate('/');
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const navigateAdmin = () => {
    navigate('/admin');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app font-body_font">
        <header className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8 shadow-md bg-primary-900">
          <div className="flex justify-between max-w-7xl m-auto">
            <button type="button" onClick={navigateHome}>
              <img
                className="w-[50px] h-[50px] md:hidden"
                src="./logo_small.png"
                alt="logo"
              />
              <img
                className=" hidden md:block"
                src="./logo_big.png"
                alt="logo"
              />
            </button>
            {!userInfo && (
              <button
                type="button"
                onClick={navigateLogin}
                className="flex self-center border-2 border-white py-1 px-2 bg-primary-900 text-white rounded 
                          transition hover:bg-white hover:text-primary-900 hover:ease-linear"
              >
                <IoLogIn className="mr-1 text-2xl" />
                <p className="font-heading_font">LOGIN</p>
              </button>
            )}
            {userInfo && (
              <button type="button" onClick={navigateAdmin}>
                <img
                  className="w-[45px] h-[45px] border-2 rounded-full bg-white"
                  src="./avatar.png"
                  alt="avatar"
                />
              </button>
            )}
          </div>
        </header>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search/:query"
              element={<Search setWords={setWords} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin words={words} />} />
          </Routes>
        </main>
        <footer className="flex flex-col items-center justify-center px-12 py-4 md:py-6 lg:py-8 bg-primary-900 text-white">
          <img src="/logo_big.png" alt="logo" width="140" className="mb-2" />
          <p className="font-body2_font">
            Developed by&nbsp;
            <a
              href="https://github.com/Jay-JYKim91/AllThatWord"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer hover:underline hover:decoration-solid hover:decoration-2"
            >
              Juyeon Kim
            </a>
          </p>
          <p>
            Using&nbsp;
            <a
              href="https://dictionaryapi.dev/"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer hover:underline hover:decoration-solid hover:decoration-2"
            >
              Free Dictionary API
            </a>
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default App;
