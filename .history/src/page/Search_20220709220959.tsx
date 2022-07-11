import { AxiosError } from 'axios';
import SearchBar from 'component/SearchBar';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { searchByQuery } from '../services/dictionaryAPI';

const Search: React.FC = () => {
  const { query } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    'searchByQuery',
    () => searchByQuery(query! as string),
    { retry: false }
  );

  if (isLoading) {
    return (
      <div>
        <p>isLoading {isLoading}</p>
      </div>
    );
  }

  if (isError) {
    console.log((error! as AxiosError).response?.status);
    return (
      <div>
        <p>isError {isError}</p>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <SearchBar />
      <h1>{query}</h1>
      {/* {data.map()} */}
    </div>
  );
};

export default Search;
