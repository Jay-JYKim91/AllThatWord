import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <form className="border-2 border-primary-900">
      <input type="search" />
      <button type="submit" className="bg-primary-900">
        <img src="./search.png" alt="search" />
      </button>
    </form>
  );
};

export default SearchBar;
