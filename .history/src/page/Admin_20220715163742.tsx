import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { LooseObj } from 'App';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GiSpeaker } from 'react-icons/gi';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
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
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handlePrevCard = () => {
    console.log('hey');
    const newSlide =
      currentSlide === Object.keys(words).length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handleNextCard = () => {
    const newSlide =
      currentSlide === 0 ? Object.keys(words).length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const findParentElement = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let result: Element = event.target as Element;
    while (!result.classList.contains('card')) {
      result = result.parentElement as Element;
    }
    return result;
  };

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <div className="flex justify-end max-w-2xl m-auto">
        <button
          type="button"
          onClick={() => handleLogout()}
          className="flex items-center bg-primary-900 text-white px-2 py-1 rounded"
        >
          <IoLogOut className="mr-1 text-2xl" />
          Logout
        </button>
      </div>
      <h1 className="font-heading_font text-3xl mt-4 max-w-2xl m-auto">
        My Words
      </h1>
      <div className="text-right mt-2 mb-4 max-w-2xl m-auto">
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

      <div className="max-w-2xl m-auto">
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
                {word.meanings.map((meaning, index) => {
                  const marginBottom =
                    index === word.meanings.length - 1 ? '' : 'mb-1';
                  return (
                    <div key={meaning.partOfSpeech}>
                      <p className="text-primary-900 font-bold mr-2 min-w-[105px]">
                        {meaning.partOfSpeech.toUpperCase()}
                      </p>
                      <p className={marginBottom}>
                        {meaning.definitions[0].definition}
                      </p>
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

        {viewMode === 'flashcard' && (
          <div className="h-[40vh] overflow-hidden relative my-10">
            <button
              type="button"
              onClick={() => handlePrevCard()}
              className="absolute left-0 inset-y-1/2"
            >
              <AiOutlineCaretLeft className="text-primary-900 text-3xl mr-2" />
            </button>
            {Object.keys(words).map((key, index) => {
              const word = words[key] as Word;
              const divStyle = index === currentSlide ? 'block' : 'hidden';

              return (
                <div
                  className={`card ${divStyle}`}
                  role="button"
                  tabIndex={index}
                  key={word.id}
                  onClick={(event) => {
                    findParentElement(event).classList.toggle('is-flipped');
                  }}
                >
                  <div
                    className="card__face card__face--front mb-2 rounded w-full h-full flex flex-col justify-center align-middle"
                    key={word.id}
                  >
                    <p className="font-heading_font text-2xl text-center lg:text-4xl">
                      {word.id}
                    </p>
                    <div className="flex items-center justify-center">
                      <p className="text-neutral-600 text-md">
                        {word.phonetic}
                      </p>
                    </div>
                  </div>
                  <div className="card__face card__face--back flex flex-col align-middle md:justify-center overflow-y-scroll">
                    {word.meanings.map((meaning) => {
                      return (
                        <div key={meaning.partOfSpeech}>
                          <p className="text-primary-900 font-bold text-left text-sm lg:text-base">
                            {meaning.partOfSpeech.toUpperCase()}
                          </p>
                          <p className="text-left mb-4 lg:text-lg">
                            {meaning.definitions[0].definition}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => handleNextCard()}
              className="absolute right-0 inset-y-1/2"
            >
              <AiOutlineCaretRight className="text-primary-900 text-3xl ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
