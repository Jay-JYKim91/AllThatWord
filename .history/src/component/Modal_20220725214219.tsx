import { Folder, LooseObj } from 'App';
import React from 'react';
import { BsPlusLg } from 'react-icons/bs';

const Modal: React.FC = () => {
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
    const form = document.getElementById('form');
    const button = document.getElementById('displayFormBtn');
    button!.style.display = 'block';
    form!.style.display = 'none';
    setFolderName('');
  };

  const handleAddFolder = () => {
    const button = document.getElementById('displayFormBtn');
    const form = document.getElementById('form');
    button!.style.display = 'none';
    form!.style.display = 'block';
  };

  return (
    <div
      className="bg-white border border-primary-900 hidden absolute right-0 p-4 min-w-[200px]"
      id="modal"
    >
      <p className="font-heading_font font-medium text-center text-lg">
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
        />
        <button type="submit">Add</button>
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
