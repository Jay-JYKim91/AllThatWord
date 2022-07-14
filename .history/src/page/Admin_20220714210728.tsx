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
import { Carousel } from 'flowbite-react';

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

  const carousel = new Carousel(
    [
      {
        position: 0,
        el: document.getElementById('carousel-item-1'),
      },
      {
        position: 1,
        el: document.getElementById('carousel-item-2'),
      },
      {
        position: 2,
        el: document.getElementById('carousel-item-3'),
      },
      {
        position: 3,
        el: document.getElementById('carousel-item-4'),
      },
    ],
    {
      activeItemPosition: 1,
      interval: 3000,

      indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses:
          'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: [
          {
            position: 0,
            el: document.getElementById('carousel-indicator-1'),
          },
          {
            position: 1,
            el: document.getElementById('carousel-indicator-2'),
          },
          {
            position: 2,
            el: document.getElementById('carousel-indicator-3'),
          },
          {
            position: 3,
            el: document.getElementById('carousel-indicator-4'),
          },
        ],
      },

      // callback functions
      onNext: () => {
        console.log('next slider item is shown');
      },
      onPrev: () => {
        console.log('previous slider item is shown');
      },
      onChange: () => {
        console.log('new slider item has been shown');
      },
    }
  );

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
                src="https://picsum.photos/id/237/200/300"
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
                src="https://picsum.photos/id/27/200/300"
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
