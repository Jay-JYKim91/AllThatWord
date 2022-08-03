import React from 'react';

const Modal: React.FC = () => {
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
