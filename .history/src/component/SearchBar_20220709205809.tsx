import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <form className="border-2 rounded border-primary-900 flex">
      <input type="search" className="w-full" />
      <button type="submit" className="border bg-primary-900 p-2">
        <img src="./search.png" alt="search" />
      </button>
    </form>
  );
};

export default SearchBar;
