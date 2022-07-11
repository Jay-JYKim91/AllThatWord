import SearchBar from 'component/SearchBar';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MdOutlineError } from 'react-icons/md';
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

  const { isLoading, isError, data, refetch } = useQuery(
    'searchByQuery',
    () => searchByQuery(query! as string),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [query]);

  if (isLoading) {
    return (
      <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
        <SearchBar />
        <p>isLoading {isLoading}</p>
      </div>
    );
  }

  if (isError) {
    // console.log((error! as AxiosError).response?.status);
    return (
      <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
        <SearchBar />
        <div className="py-20">
          <MdOutlineError className="text-5xl text-primary-900 m-auto" />
          <p className="mt-4 text-2xl font-body1_font">
            No results found for &apos;{query}&apos;
            <br />
            Please try again with another keywords.
          </p>
        </div>
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
              return (
                <div key={definition.definition}>
                  <p>{definition.definition}</p>
                  <p>{definition.example && definition.example}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Search;
