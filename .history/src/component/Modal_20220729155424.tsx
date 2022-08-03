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

type Display = 'block' | 'hidden';

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
  const defaultFolderId = folders ? Object.keys(folders)[0] : '';
  const [selectedFolder, setSelectedFolder] = useState(defaultFolderId);

  const displayInput = (type: Display) => {
    const form = document.getElementById('form');
    const button = document.getElementById('displayFormBtn');
    if (type === 'block') {
      button!.style.display = 'none';
      form!.style.display = 'flex';
    } else {
      button!.style.display = 'flex';
      form!.style.display = 'none';
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (folderName === '') {
      return;
    }
    const date = Date.now();
    const arr: string[] = [];
    Object.keys(folders).map((key) => arr.push((folders[key] as Folder).name));
    if (arr.includes(folderName)) {
      alert(`'${folderName}' folder is already existed.`);
    } else {
      const folder: Folder = {
        id: date,
        name: folderName,
        words: {},
      };
      const updated: LooseObj = { ...folders };
      updated[folder.id] = folder;
      setFolders(updated);
      repo.addFolder(userInfo!.uid, folder);
      displayInput('hidden');
    }
    setFolderName('');
  };

  const handleAddFolder = () => {
    displayInput('block');
    document.getElementById('folderNameInput')!.focus();
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
    repo.saveWord(userInfo!.uid, word, selectedFolder);
  };

  const handleSelectedFolderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFolder(e.target.value);
  };

  return (
    <div
      className="bg-white border border-primary-900 hidden absolute right-0 pt-4 min-w-[230px] z-10 dark:border-white"
      id="modal"
    >
      <p className="font-heading_font font-medium text-center px-4 text-lg mb-2 dark:text-black">
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
          maxLength={14}
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
          className="border rounded px-1 border-primary-900 w-full focus:outline-none dark:text-primary-900"
          id="folderNameInput"
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
