import { Folder, LooseObj, FoldersObj } from 'App';
import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

type Props = {
  folders: LooseObj;
  setFolders: React.Dispatch<React.SetStateAction<FoldersObj>>;
};

const Modal: React.FC<Props> = ({ folders, setFolders }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const date = Date.now();
    const folder: Folder = {
      id: date,
      name: folderName,
      words: {},
    };
    console.log(folder);
    // const updated: FoldersObj = { ...folders };
    // updated[folder.id] = folder;
    // setFolders(updated);
    // const form = document.getElementById('form');
    // const button = document.getElementById('displayFormBtn');
    // button!.style.display = 'block';
    // form!.style.display = 'none';
    // setFolderName('');
  };

  const handleAddFolder = () => {
    const button = document.getElementById('displayFormBtn');
    const form = document.getElementById('form');
    button!.style.display = 'none';
    form!.style.display = 'flex';
  };

  return (
    <div
      className="bg-white border border-primary-900 hidden absolute right-0 p-4 min-w-[200px]"
      id="modal"
    >
      <p className="font-heading_font font-medium text-center text-lg mb-2">
        ADD WORDS
      </p>
      <button
        id="displayFormBtn"
        type="button"
        className="flex text-neutral-600 items-center"
        onClick={handleAddFolder}
      >
        <BsPlusLg className="mr-2 text-neutral-600" />
        Add new folder
      </button>
      <hr />
      <form onSubmit={handleSubmit} className="hidden" id="form">
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

      <ul>
        {Object.keys(folders).map((key) => {
          const folder = folders[key] as Folder;
          return <li key={folder.id}>{folder.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Modal;
