import { Folder, LooseObj } from 'App';
import { AuthContext } from 'context/authContext';
import { Data, Phonetic, WordProp } from 'page/Search';
import React, { useContext, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import * as repo from 'services/repository';

type Props = {
  folders: LooseObj;
  setFolders: React.Dispatch<React.SetStateAction<LooseObj>>;
  data: Data;
  findAudioSrc: (phonetics: Array<Phonetic>) => string;
  words: LooseObj;
  setWords: React.Dispatch<React.SetStateAction<LooseObj>>;
};

const Modal: React.FC<Props> = ({
  folders,
  setFolders,
  data,
  findAudioSrc,
  words,
  setWords,
}) => {
  const [folderName, setFolderName] = useState('');
  const userInfo = useContext(AuthContext);
  //   let selectedFolderId = '';
  const [selectedFolder, setSelectedFolder] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const date = Date.now();
    const folder: Folder = {
      id: date,
      name: folderName,
      words: {},
    };
    const updated: LooseObj = { ...folders };
    updated[folder.id] = folder;
    setFolders(updated);
    repo.addFolder(userInfo!.uid, folder);
    const form = document.getElementById('form');
    const button = document.getElementById('displayFormBtn');
    button!.style.display = 'flex';
    form!.style.display = 'none';
    setFolderName('');
  };

  const handleAddFolder = () => {
    const form = document.getElementById('form');
    const button = document.getElementById('displayFormBtn');
    button!.style.display = 'none';
    form!.style.display = 'flex';
  };

  const handleSave = () => {
    const src = findAudioSrc(data.phonetics);

    const word: WordProp = {
      id: data.word,
      phonetic: data.phonetic || '',
      pronunciation: src || '',
      meanings: data.meanings,
    };
    const updated: LooseObj = { ...words };
    updated[word.id] = word;
    setWords(updated);
    repo.saveWordToFolder(userInfo!.uid, word, selectedFolder);
  };

  const handleSelectedFolderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFolder(e.target.value);
  };

  return (
    <div
      className="bg-white border border-primary-900 hidden absolute right-0 pt-4 min-w-[230px] z-10"
      id="modal"
    >
      <p className="font-heading_font font-medium text-center px-4 text-lg mb-2">
        ADD WORDS
      </p>
      <button
        id="displayFormBtn"
        type="button"
        className="flex text-neutral-600 items-center px-4 mb-2"
        onClick={handleAddFolder}
      >
        <BsPlusLg className="mr-2 text-neutral-600" />
        Add new folder
      </button>
      <hr className="w-[90%] m-auto" />
      <form onSubmit={handleSubmit} className="hidden px-4 my-2" id="form">
        <input
          type="text"
          maxLength={16}
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
          className="border w-full"
        />
        <button
          type="submit"
          className="py-1 px-2 bg-primary-900 text-white rounded font-medium"
        >
          ADD
        </button>
      </form>

      <ul className="px-4">
        {Object.keys(folders).map((key) => {
          const folder = folders[key] as Folder;
          return (
            <li key={folder.id} className="my-1">
              <input
                id="selectedFolder"
                value={folder.id}
                name="selectedFolder"
                type="radio"
                className="mr-2 my-2"
                checked={
                  selectedFolder ===
                  (typeof folder.id === 'number'
                    ? folder.id.toString()
                    : folder.id)
                }
                onChange={(e) => {
                  handleSelectedFolderChange(e);
                }}
              />
              <label htmlFor="selectedFolder">{folder.name}</label>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="w-full bg-primary-900 text-white py-2 mt-2"
        onClick={handleSave}
      >
        SAVE
      </button>
    </div>
  );
};

export default Modal;
