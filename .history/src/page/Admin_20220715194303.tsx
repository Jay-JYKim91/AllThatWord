import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { LooseObj } from 'App';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import Flashcard from 'component/Flashcard';
import { auth } from '../services/firebase';
import { AuthContext } from '../context/authContext';
import { WordProp } from './Search';
import Word from 'component/Word';

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
    const newSlide =
      currentSlide === 0 ? Object.keys(words).length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const handleNextCard = () => {
    const newSlide =
      currentSlide === Object.keys(words).length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
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
            const word = words[key] as WordProp;

            return <Word key={word.id} word={word} />;
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
                <Flashcard
                  word={word}
                  divStyle={divStyle}
                  index={index}
                  key={word.id}
                />
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
