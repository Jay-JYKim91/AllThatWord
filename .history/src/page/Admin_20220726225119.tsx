import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { Folder, LooseObj } from 'App';
import {
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiFillEdit,
  AiOutlineCheck,
} from 'react-icons/ai';
import Flashcard from 'component/Flashcard';
import Word from 'component/Word';
import { auth } from '../services/firebase';
import { AuthContext } from '../context/authContext';
import { WordProp } from './Search';
import * as repo from '../services/repository';

type Props = {
  words: LooseObj;
  setWords: React.Dispatch<React.SetStateAction<LooseObj>>;
  folders: LooseObj;
  setFolders: React.Dispatch<React.SetStateAction<LooseObj>>;
};

type ViewMode = 'flashcard' | 'list';

const Admin: React.FC<Props> = ({ words, setWords, folders, setFolders }) => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentSlide, setCurrentSlide] = useState(0);
  const defaultFolder = folders ? Object.keys(folders)[0] : '';
  const [selectedFolder, setSelectedFolder] = useState(defaultFolder);
  const [filteredWords, setfilteredWords] = useState(
    folders[defaultFolder].words
  );
  const [editedFolderName, setEditedFolderName] = useState(
    folders[selectedFolder].name
  );

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

  const handlePrevCard = () => {
    const newSlide =
      currentSlide === 0
        ? Object.keys(filteredWords).length - 1
        : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const handleNextCard = () => {
    const newSlide =
      currentSlide === Object.keys(filteredWords).length - 1
        ? 0
        : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handleSelectFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFolder(e.target.value);
    setfilteredWords(folders[e.target.value].words);
  };

  const handleEditFolder = () => {
    const p = document.getElementById('folderName');
    const editBtn = document.getElementById('editBtn');
    const form = document.getElementById('form');
    p.style.display = 'none';
    editBtn!.style.display = 'none';
    form!.style.display = 'flex';
    document.getElementById('formInput')!.focus();
  };

  const submitEditFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const folder: Folder = {
      id: folders[selectedFolder].id,
      name: editedFolderName,
      words: folders[selectedFolder].words,
    };
    const updated: LooseObj = { ...folders };
    updated[folder.id] = folder;
    setFolders(updated);
    repo.addFolder(userInfo!.uid, folder);
    const p = document.getElementById('folderName');
    const editBtn = document.getElementById('editBtn');
    const form = document.getElementById('form');
    p.style.display = 'flex';
    editBtn!.style.display = 'flex';
    form!.style.display = 'none';
    // submitBtn!.style.display = 'none';
  };
  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <div className="flex justify-end max-w-2xl m-auto">
        <button
          type="button"
          onClick={() => handleLogout()}
          className="flex items-center bg-primary-900 border-2 border-primary-900 text-white px-2 py-1 rounded transition dark:border-white hover:bg-white hover:text-primary-900"
        >
          <IoLogOut className="mr-1 text-2xl" />
          Logout
        </button>
      </div>
      <h1 className="font-heading_font text-3xl mt-4 max-w-2xl m-auto dark:text-white">
        My Words
      </h1>
      <select
        name="selectedFolder"
        id="selectedFolder"
        onChange={(e) => handleSelectFolder(e)}
        value={selectedFolder}
        className="border border-primary-900 rounded my-4 w-full p-2"
      >
        {Object.keys(folders).map((key) => {
          return (
            <option value={folders[key].id} key={folders[key].id}>
              {folders[key].name}
            </option>
          );
        })}
      </select>
      <div className="text-right mt-2 mb-4 max-w-2xl m-auto">
        <button
          type="button"
          className="bg-primary-900 text-white py-1 px-2 border-2 rounded border-primary-900 transition dark:border-white hover:text-primary-900 hover:bg-white"
          onClick={() => {
            return viewMode === 'list'
              ? setViewMode('flashcard')
              : setViewMode('list');
          }}
        >
          {viewMode === 'list' ? 'FLASHCARD MODE' : 'LIST MODE'}
        </button>
      </div>

      <div className="my-2 flex justify-between items-center">
        <p className="font-heading_font text-2xl" id="folderName">
          {folders[selectedFolder].name}
        </p>

        <button type="button" onClick={handleEditFolder} id="editBtn">
          <AiFillEdit className="text-2xl text-primary-900" />
        </button>
        <form
          onSubmit={(e) => submitEditFolder(e)}
          className="hidden justify-between items-center w-full"
          id="form"
        >
          <input
            type="text"
            maxLength={14}
            className="border text-xl font-heading_font p-1"
            id="formInput"
            value={editedFolderName}
            onChange={(event) => setEditedFolderName(event.target.value)}
          />
          <button type="submit" id="submitBtn">
            <AiOutlineCheck className="text-2xl text-primary-900" />
          </button>
        </form>
      </div>

      <div className="max-w-2xl m-auto">
        {viewMode === 'list' &&
          Object.keys(filteredWords).map((key) => {
            const word = filteredWords[key] as WordProp;
            return (
              <Word
                key={word.id}
                word={word}
                setWords={setWords}
                words={words}
                setFolders={setFolders}
              />
            );
          })}

        {viewMode === 'flashcard' && (
          <div className="h-[40vh] overflow-hidden relative my-10">
            <button
              type="button"
              onClick={() => handlePrevCard()}
              className="absolute left-0 inset-y-1/2"
            >
              <AiOutlineCaretLeft className="text-primary-900 text-3xl mr-2 dark:text-white" />
            </button>
            {Object.keys(filteredWords).map((key, index) => {
              const word = filteredWords[key] as WordProp;
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
              <AiOutlineCaretRight className="text-primary-900 text-3xl ml-2 dark:text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
