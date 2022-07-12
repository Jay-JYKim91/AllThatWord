import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { LooseObj } from 'App';
import { RiDeleteBin5Fill } from 'react-icons/ri';
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
          <div className="border p-2">
            <p className="font-heading_font text-xl">{word.id}</p>
            <div>
              <p>{word.phonetic}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-neutral-600">{data.phonetic}</p>
              <button
                type="button"
                className="ml-2"
                onClick={() => {
                  const src = findAudioSrc(data.phonetics);
                  handlePlaySound(src);
                }}
              >
                <GiSpeaker className="text-3xl" />
              </button>
            </div>

            <button type="button" onClick={() => handleDelete(word)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
