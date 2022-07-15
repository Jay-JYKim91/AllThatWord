import React, { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type Prop = {
  query?: string;
};
const SearchBar: React.FC<Prop> = ({ query }) => {
  console.log(query);
  const [inputValue, setInputValue] = useState(query || '');
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return inputValue && navigate(`/search/${inputValue}`);
  };

  useEffect(() => {
    query = query;
  }, [query]);

  return (
    <form
      className="border-2 rounded border-primary-900 flex max-w-2xl m-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="Search here"
        className="w-full p-2 caret-primary-900 text-xl focus:outline-none"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
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
