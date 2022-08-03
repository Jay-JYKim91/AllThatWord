import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { Folder, LooseObj } from 'App';
import {
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiFillEdit,
} from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
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
type Display = 'display' | 'hidden';

const Admin: React.FC<Props> = ({ words, setWords, folders, setFolders }) => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(folders);
  let defaultFolderId =
    Object.keys(folders).length !== 0 ? Object.keys(folders)[0] : '';
  console.log(`defaultFolder: ${defaultFolderId}`); // ''
  const [selectedFolderId, setSelectedFolderId] = useState(defaultFolderId);
  console.log(`selectedFolderId: ${selectedFolderId}`); // ''
  const defaultFolder =
    Object.keys(folders).length !== 0
      ? (folders[defaultFolderId] as Folder)
      : {};
  console.log(defaultFolder); // {}
  const [filteredWords, setFilteredWords] = useState(
    Object.keys(defaultFolder).length !== 0 ? defaultFolder.words : {}
  );
  let selectedFolderObj =
    selectedFolderId !== '' ? (folders[selectedFolderId] as Folder) : {};
  console.log(selectedFolderObj); // {}
  const [editedFolderName, setEditedFolderName] = useState(
    Object.keys(selectedFolderObj).length !== 0 ? selectedFolderObj.name : ''
  );
  const [isFoldersEmpty, setIsFoldersEmpty] = useState(
    Object.keys(folders).length !== 0 ? false : true
  );
  const [isDeletedFolder, setIsDeletedFolder] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      alert('You need to login first.');
      navigate('/login');
    }
  }, [auth]);

  useEffect(() => {
    if (isDeletedFolder) {
      defaultFolderId =
        Object.keys(folders).length !== 0 ? Object.keys(folders)[0] : '';
      setSelectedFolderId(defaultFolderId);
      setFilteredWords(
        Object.keys(defaultFolder).length !== 0 ? defaultFolder.words : {}
      );
      console.log('--------------');
      console.log(Object.keys(folders).length);
      setIsFoldersEmpty(Object.keys(folders).length !== 0 ? false : true);
    }
    setIsDeletedFolder(false);
  }, [folders]);

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

  const displayForm = (type: Display) => {
    const p = document.getElementById('folderName');
    const editAndDeleteFolderBtn = document.getElementById(
      'editAndDeleteFolderBtn'
    );
    const form = document.getElementById('form');

    if (type === 'display') {
      p!.style.display = 'none';
      editAndDeleteFolderBtn!.style.display = 'none';
      form!.style.display = 'flex';
    } else {
      p!.style.display = 'flex';
      editAndDeleteFolderBtn!.style.display = 'flex';
      form!.style.display = 'none';
    }
  };

  const handleSelectFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFolderId(e.target.value);
    const thisFolder = folders[e.target.value] as Folder;
    setFilteredWords(thisFolder.words);
    displayForm('hidden');
  };

  useEffect(() => {
    selectedFolderObj =
      selectedFolderId !== '' ? (folders[selectedFolderId] as Folder) : {};
    setEditedFolderName(
      Object.keys(selectedFolderObj).length !== 0 ? selectedFolderObj.name : ''
    );
  }, [selectedFolderId]);

  const handleEditFolder = () => {
    displayForm('display');
    document.getElementById('formInput')!.focus();
  };

  const submitEditFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const folder: Folder = {
      id: selectedFolderObj.id,
      name: editedFolderName,
      words: selectedFolderObj.words || {},
    };
    const updated: LooseObj = { ...folders };
    updated[folder.id] = folder;
    setFolders(updated);
    repo.addFolder(userInfo!.uid, folder);

    displayForm('hidden');
  };

  const handleDeleteFolder = (folderId: string) => {
    const isConfirmed = confirm(
      'Are you sure you want to permanently delete this folder?'
    );

    if (isConfirmed) {
      setIsDeletedFolder(true);
      const tempFolders = { ...folders };
      const tem = Object.keys(tempFolders)
        .filter((key) => key !== folderId)
        .reduce((obj, key) => {
          obj[key] = tempFolders[key];
          return obj;
        }, {});
      setSelectedFolderId(
        Object.keys(tem).length !== 0 ? Object.keys(tem)[0] : ''
      );

      setFolders((folders) => {
        const updated: LooseObj = { ...folders };
        delete updated[folderId];
        return updated;
      });

      setWords((words) => {
        const updated: LooseObj = { ...words };
        const filteredWords = Object.keys(updated)
          .filter((word) => {
            const w = updated[word] as { folderId: string };
            return w.folderId !== folderId;
          })
          .reduce((obj, key) => {
            obj[key] = words[key];
            return obj;
          }, {});
        repo.removeFolder(userInfo!.uid, folderId, filteredWords);

        return filteredWords;
      });
    }
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
      {!isFoldersEmpty ? (
        <div>
          <div className="text-right">
            <select
              name="selectedFolder"
              id="selectedFolder"
              onChange={(e) => handleSelectFolder(e)}
              value={selectedFolderId}
              className="border border-primary-900 rounded my-4 w-[160px] p-2"
            >
              {Object.keys(folders).map((key) => {
                const eachFolder = folders[key] as Folder;
                return (
                  <option value={eachFolder.id} key={eachFolder.id}>
                    {eachFolder.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-2 flex justify-between items-center">
            <p className="font-heading_font text-2xl" id="folderName">
              {selectedFolderObj.name}
            </p>

            <div id="editAndDeleteFolderBtn">
              <button type="button" onClick={handleEditFolder}>
                <AiFillEdit className="text-2xl text-primary-900 mr-2" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteFolder(`${selectedFolderObj.id}`)}
              >
                <RiDeleteBin5Fill className="text-2xl text-primary-900" />
              </button>
            </div>

            <form
              onSubmit={(e) => submitEditFolder(e)}
              className="hidden justify-between items-center w-full"
              id="form"
            >
              <input
                type="text"
                maxLength={14}
                className="border text-xl font-heading_font p-1 focus:outline-none"
                id="formInput"
                value={editedFolderName}
                onChange={(event) => setEditedFolderName(event.target.value)}
              />
              <button type="submit" id="submitBtn">
                <BsCheckLg className="text-2xl text-primary-900" />
              </button>
            </form>
          </div>

          {filteredWords && Object.keys(filteredWords).length !== 0 && (
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
          )}

          <div className="max-w-2xl m-auto">
            {viewMode === 'list' &&
              filteredWords &&
              Object.keys(filteredWords).length &&
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

            {viewMode === 'flashcard' &&
              filteredWords &&
              Object.keys(filteredWords).length && (
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
                    const divStyle =
                      index === currentSlide ? 'block' : 'hidden';

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
            {(!filteredWords || !Object.keys(filteredWords).length) && (
              <div className="my-4 text-center text-xl">
                <p>There is no word in this folder.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="my-4 text-center text-xl">
          <p>No word saved</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
