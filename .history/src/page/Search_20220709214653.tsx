import SearchBar from 'component/SearchBar';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import searchByQuery from '../services/dictionaryAPI';

const Search: React.FC = () => {
  const { query } = useParams();

  const { isLoading, isError, data } = useQuery('searchByQuery', () =>
    searchByQuery(query)
  );

  if (isLoading) {
    return (
      <div>
        <p>isLoading {isLoading}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>isError {isError}</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <SearchBar />
    </div>
  );
};

export default Search;
