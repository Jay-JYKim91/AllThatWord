import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <form className="border-2 border-primary-900 flex">
      <input type="search" className="w-full" />
      <button type="submit" className="bg-primary-900">
        <img src="./search.png" alt="search" />
      </button>
    </form>
  );
};

export default SearchBar;
