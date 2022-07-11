import { AxiosError } from 'axios';
import SearchBar from 'component/SearchBar';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { searchByQuery } from '../services/dictionaryAPI';

type Definition = {
  antonyms: string[];
  definition: string;
  example?: string;
  synonyms: string[];
};

type Meaning = {
  antonyms: string[];
  definitions: Definition[];
  partOfSpeech: string;
  synonyms: string[];
};

// type Result = {
//   meanings: Meaning[];
//   phonetic: string;
//   phonetics: [];
// };

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
      <p>{data.phonetic}</p>
      {data.meanings.map((meaning: Meaning) => {
        return (
          <div key={meaning.partOfSpeech}>
            <p>{meaning.partOfSpeech}</p>
            {meaning.definitions.map((definition: Definition) => {
              <p>{definition}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Search;
