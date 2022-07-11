import SearchBar from 'component/SearchBar';
import React from 'react';
import { useParams } from 'react-router-dom';

const Search: React.FC = () => {
  const { query } = useParams();
  console.log(query);

  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default Search;
