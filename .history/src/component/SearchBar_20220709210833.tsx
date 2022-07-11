import React from 'react';

const SearchBar: React.FC = () => {
  const handleSubmit = () => {};

  return (
    <form
      className="border-2 rounded border-primary-900 flex max-w-2xl m-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="Search here"
        className="w-full p-2 caret-primary-900 text-xl focus:outline-none"
      />
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
