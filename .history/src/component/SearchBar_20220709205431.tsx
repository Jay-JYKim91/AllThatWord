import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <form>
      <input type="search" />
      <button>
        <img src="./search.png" alt="search" />
      </button>
    </form>
  );
};

export default SearchBar;
