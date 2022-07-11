import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <form className="border-2 rounded border-primary-900 flex">
      <input type="search" className="w-full p-2 focus:outline-none" />
      <button
        type="submit"
        className="border border-primary-900 bg-primary-900 p-2"
      >
        <img src="./search.png" alt="search" className="w-8" />
      </button>
    </form>
  );
};

export default SearchBar;
