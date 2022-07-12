import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
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

const Admin: React.FC<Props> = ({ words, setWords }) => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);

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

  const handleDelete = (word: Word) => {
    setWords((words) => {
      const updated = { ...words };
      delete updated[word.id];
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
      <h1 className="font-heading_font text-3xl my-4">My Words</h1>
      {Object.keys(words).map((key) => {
        const word = words[key] as Word;

        return (
          <div className="border py-2 px-4">
            <div className="flex items-center justify-between">
              <p className="font-heading_font text-xl">{word.id}</p>
              <button type="button" onClick={() => handleDelete(word)}>
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
                <div className="flex">
                  <p className="text-primary-900 font-bold mr-2 min-w-[78px]">
                    {meaning.partOfSpeech.toUpperCase()}
                  </p>
                  <p>{meaning.definitions[0].definition}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
