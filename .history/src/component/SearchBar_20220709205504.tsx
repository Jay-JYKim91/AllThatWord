import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <form className="border border-2">
      <input type="search" />
      <button type="submit">
        <img src="./search.png" alt="search" />
      </button>
    </form>
  );
};

export default SearchBar;
