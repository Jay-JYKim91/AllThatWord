import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { LooseObj } from 'App';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GiSpeaker } from 'react-icons/gi';
import { auth } from '../services/firebase';
import { AuthContext } from '../context/authContext';
import { Word } from './Search';

type Props = {
  words: LooseObj;
  setWords: React.Dispatch<React.SetStateAction<LooseObj>>;
};

type ViewMode = 'flashcard' | 'list';

const Admin: React.FC<Props> = ({ words, setWords }) => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  useEffect(() => {
    if (!userInfo) {
      alert('You need to login first.');
      navigate('/login');
    }
  }, [auth]);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  const handleDelete = (id: string) => {
    setWords((words) => {
      const updated = { ...words };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => handleLogout()}
          className="flex items-center bg-primary-900 text-white px-2 py-1 rounded"
        >
          <IoLogOut className="mr-1 text-2xl" />
          Logout
        </button>
      </div>
      <h1 className="font-heading_font text-3xl mt-4">My Words</h1>
      <div className="text-right mt-2 mb-4">
        <button
          type="button"
          className="bg-primary-900 text-white py-1 px-2"
          onClick={() => {
            return viewMode === 'list'
              ? setViewMode('flashcard')
              : setViewMode('list');
          }}
        >
          {viewMode === 'list' ? 'FLASHCARD MODE' : 'LIST MODE'}
        </button>
      </div>

      <div>
        {viewMode === 'list' &&
          Object.keys(words).map((key) => {
            const word = words[key] as Word;

            return (
              <div
                className="py-2 px-3 bg-neutral-200 mb-2 rounded"
                key={word.id}
              >
                <div className="flex items-center justify-between">
                  <p className="font-heading_font text-2xl">{word.id}</p>
                  <button type="button" onClick={() => handleDelete(word.id)}>
                    <RiDeleteBin5Fill className="text-2xl text-primary-900" />
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <p className="text-neutral-600 text-md">{word.phonetic}</p>
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      new Audio(word.pronunciation).play();
                    }}
                  >
                    <GiSpeaker className="text-2xl" />
                  </button>
                </div>
                {word.meanings.map((meaning) => {
                  return (
                    <div className="flex" key={meaning.partOfSpeech}>
                      <p className="text-primary-900 font-bold mr-2 min-w-[105px]">
                        {meaning.partOfSpeech.toUpperCase()}
                      </p>
                      <p>{meaning.definitions[0].definition}</p>
                    </div>
                  );
                })}
                <div className="text-right mt-2 mb-1">
                  <button
                    type="button"
                    className="bg-primary-900 text-white py-1 px-4 rounded"
                    onClick={() => navigate(`/search/${word.id}`)}
                  >
                    Read more
                  </button>
                </div>
              </div>
            );
          })}
        {/* {viewMode === 'flashcard' &&
          Object.keys(words).map((key) => {
            const word = words[key] as Word;

            return (
              <div
                className="py-4 px-3 bg-neutral-200 mb-2 rounded"
                key={word.id}
              >
                <p className="font-heading_font text-2xl text-center">
                  {word.id}
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-neutral-600 text-md">{word.phonetic}</p>
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      new Audio(word.pronunciation).play();
                    }}
                  >
                    <GiSpeaker className="text-2xl" />
                  </button>
                </div>
              </div>
            );
          })} */}

        <div
          id="animation-carousel"
          className="relative"
          data-carousel="static"
        >
          {/* <!-- Carousel wrapper --> */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {/* <!-- Item 1 --> */}
            <div
              className="hidden duration-200 ease-linear absolute inset-0 transition-all transform"
              data-carousel-item=""
            >
              <img
                src="data:image/png;base64,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"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 2 --> */}
            <div
              className="duration-200 ease-linear absolute inset-0 transition-all transform -translate-x-full z-10"
              data-carousel-item=""
            >
              <img
                src="https://picsum.photos/250/250"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 3 --> */}
            <div
              className="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-0 z-20"
              data-carousel-item="active"
            >
              <img
                src="https://picsum.photos/250/250"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 4 --> */}
            <div
              className="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-full z-10"
              data-carousel-item=""
            >
              <img
                src="https://picsum.photos/250/250"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 5 --> */}
            <div
              className="hidden duration-200 ease-linear absolute inset-0 transition-all transform"
              data-carousel-item=""
            >
              <img
                src="https://picsum.photos/250/250"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          {/* <!-- Slider controls --> */}
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span>❌</span>
            {/* <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              화살표
            </span> */}
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next=""
          >
            <span>❌</span>
            {/* <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              화살표
            </span> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
