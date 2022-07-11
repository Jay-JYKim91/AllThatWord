import SearchBar from 'component/SearchBar';
import React from 'react';
import { useParams } from 'react-router-dom';

const Search: React.FC = () => {
  const { query } = useParams();
  console.log(query);

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <SearchBar />
    </div>
  );
};

export default Search;
